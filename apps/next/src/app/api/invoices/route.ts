import { NextResponse } from "next/server";
import { InvoicesResponseSchema } from "@mf/shared";

const data = {
  data: [
    { id: "inv_001", customerName: "Acme Co", amountCents: 12500, status: "unpaid" },
    { id: "inv_002", customerName: "Blue Ocean LLC", amountCents: 4999, status: "paid" }
  ]
};

export async function GET() {
  // Validate before returning (server ensures contract correctness)
  const parsed = InvoicesResponseSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid invoice data" }, { status: 500 });
  }

  return NextResponse.json(parsed.data, { status: 200 });
}
