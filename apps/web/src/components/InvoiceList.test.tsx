import { render, screen } from "@testing-library/react";
import { InvoiceList } from "./InvoiceList";
import type { Invoice } from "@mf/shared";
import { test, expect } from "vitest";

test("renders invoices", () => {
  const invoices: Invoice[] = [
    { id: "inv_001", customerName: "Acme Co", amountCents: 12500, status: "unpaid" },
    { id: "inv_002", customerName: "Blue Ocean LLC", amountCents: 4999, status: "paid" }
  ];

  render(<InvoiceList invoices={invoices} />);

  expect(screen.getByText(/Acme Co/)).toBeInTheDocument();
  expect(screen.getByText(/\$125\.00/)).toBeInTheDocument();
  expect(screen.getByText(/unpaid/)).toBeInTheDocument();
});
