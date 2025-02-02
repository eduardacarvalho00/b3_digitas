import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Pagination } from ".";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  it("should render correctly with the data passed", () => {
    const onPageChange = vi.fn();
    const { getByText, getByLabelText } = render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    expect(getByText("2 of 5")).toBeInTheDocument();
    expect(getByLabelText("Previous page")).not.toBeDisabled();
    expect(getByLabelText("Next page")).not.toBeDisabled();
  });

  it("should disable the previous page button when you are on the first page", () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    expect(getByLabelText("Previous page")).toBeDisabled();
    expect(getByLabelText("Next page")).not.toBeDisabled();
  });

  it("should disable the next page button when you are on the last page", () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );

    expect(getByLabelText("Next page")).toBeDisabled();
    expect(getByLabelText("Previous page")).not.toBeDisabled();
  });

  it("should call onPageChange with the previous page when clicking on the previous page button", async () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    await fireEvent.click(getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange with the next page when clicking on the next page button", async () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    await fireEvent.click(getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("não deve chamar onPageChange se o botão de página anterior estiver desabilitado", async () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
    );

    await fireEvent.click(getByLabelText("Previous page"));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("não deve chamar onPageChange se o botão de próxima página estiver desabilitado", async () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
    );

    await fireEvent.click(getByLabelText("Next page"));
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
