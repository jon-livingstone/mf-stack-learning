import { InvoiceSchema, InvoicesResponseSchema } from "../src/invoice.schema";
import { test, expect, describe, it } from "vitest";


describe("InvoiceSchema", () => {
  it("accepts a valid invoice", () => {
    const result = InvoiceSchema.safeParse({
      id: "inv_001",
      customerName: "Acme Co",
      amountCents: 12500,
      status: "unpaid"
    });
    expect(result.success).toBe(true);
  });

  it("rejects negative amountCents", () => {
    const result = InvoiceSchema.safeParse({
      id: "inv_002",
      customerName: "Bad Data LLC",
      amountCents: -1,
      status: "paid"
    });
    expect(result.success).toBe(false);
  });
});

describe("InvoicesResponseSchema", () => {
  it("accepts { data: Invoice[] }", () => {
    const result = InvoicesResponseSchema.safeParse({
      data: [{ id: "inv_001", customerName: "Acme Co", amountCents: 12500, status: "unpaid" }]
    });
    expect(result.success).toBe(true);
  });
});
