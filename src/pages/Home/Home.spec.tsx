/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Home.spec.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from ".";
import { useCurrency } from "../../queries/useCurrency";

const mockUseCurrency = {
  data: null,
  isFetching: false,
};
vi.mock("../../queries/useCurrency", () => {
  return {
    useCurrency: vi.fn(() => mockUseCurrency),
  };
});

describe("Home component", () => {
  it("shows loading state when fetching data", () => {
    // Set useCurrency hook return to fetching
    (useCurrency as any).mockReturnValue({
      data: null,
      isFetching: true,
    });

    render(<Home />);

    // Check that loading message is visible
    expect(screen.getByText(/Loading\.\.\./i)).toBeInTheDocument();
  });
});
