import { InvoicesResponseSchema, type Invoice } from "@mf/shared";

export async function getInvoices(signal?: AbortSignal): Promise<Invoice[]> {
  const res = await fetch("/api/invoices.json", { signal });

  if (!res.ok) {
    throw new Error(`Failed to fetch invoices: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const parsed = InvoicesResponseSchema.safeParse(json);

  if (!parsed.success) {
    // Keep error readable; you can log parsed.error.format() while debugging
    throw new Error("Invalid invoices payload (schema validation failed).");
  }

  return parsed.data.data;
}
