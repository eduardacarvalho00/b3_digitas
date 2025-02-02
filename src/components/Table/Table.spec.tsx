// src/components/Table/Table.spec.tsx
import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Table } from ".";
import { CurrencyRate } from "../../interfaces/currency";

vi.mock("./TableRow", () => {
  return {
    TableRow: function MockTableRow({ data }: { data: CurrencyRate }) {
      return (
        <tr data-testid="table-row">
          <td>{data.code}</td>
          <td>{data.value}</td>
          <td>{data.timestamp}</td>
        </tr>
      );
    },
  };
});

vi.mock("./TableHeader", () => {
  return {
    TableHeader: function MockTableHeader({
      handleSort,
    }: {
      handleSort: (field: keyof CurrencyRate) => void;
    }) {
      return (
        <tr>
          <th data-testid="header-code" onClick={() => handleSort("code")}>
            Code
          </th>
          <th data-testid="header-value" onClick={() => handleSort("value")}>
            Value
          </th>
          <th
            data-testid="header-timestamp"
            onClick={() => handleSort("timestamp")}
          >
            Timestamp
          </th>
        </tr>
      );
    },
  };
});

vi.mock("../Pagination", () => {
  return {
    Pagination: function MockPagination({
      currentPage,
      totalPages,
      onPageChange,
    }: {
      currentPage: number;
      totalPages: number;
      onPageChange: (page: number) => void;
    }) {
      return (
        <div data-testid="pagination">
          <button
            data-testid="prev-page"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button
            data-testid="next-page"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      );
    },
  };
});

const generateTestData = (): CurrencyRate[] => [
  { code: "B", value: 2, timestamp: 2000 },
  { code: "A", value: 1, timestamp: 1000 },
  { code: "D", value: 4, timestamp: 4000 },
  { code: "C", value: 3, timestamp: 3000 },
  { code: "E", value: 5, timestamp: 5000 },
  { code: "F", value: 6, timestamp: 6000 },
  { code: "G", value: 7, timestamp: 7000 },
  { code: "H", value: 8, timestamp: 8000 },
];

describe("Table component", () => {
  it("renders the table with paginated data (first page)", () => {
    const data = generateTestData();
    render(<Table data={data} />);

    const rows = screen.getAllByTestId("table-row");
    expect(rows).toHaveLength(6);

    expect(screen.getByTestId("pagination")).toHaveTextContent("1 of 2");
  });

  it("paginates correctly: clicking next displays the remaining rows", async () => {
    const data = generateTestData();
    render(<Table data={data} />);

    let rows = screen.getAllByTestId("table-row");
    expect(rows).toHaveLength(6);

    const nextButton = screen.getByTestId("next-page");
    await fireEvent.click(nextButton);

    rows = screen.getAllByTestId("table-row");
    expect(rows).toHaveLength(2);

    // Verify that the Pagination displays "2 of 2".
    expect(screen.getByTestId("pagination")).toHaveTextContent("2 of 2");
  });

  it("sorts data when clicking on header: toggles between ascending and descending order", async () => {
    const data = generateTestData();
    render(<Table data={data} />);
    let rows = screen.getAllByTestId("table-row");
    const getRowCodes = () => rows.map((row) => row.firstChild?.textContent);

    // Expected first page codes: A, B, C, D, E, F.
    expect(getRowCodes()).toEqual(["A", "B", "C", "D", "E", "F"]);

    const headerCode = screen.getByTestId("header-code");
    await fireEvent.click(headerCode);

    // Expected first page codes in descending order: H, G, F, E, D, C.
    rows = screen.getAllByTestId("table-row");
    expect(getRowCodes()).toEqual(["H", "G", "F", "E", "D", "C"]);
  });
});
