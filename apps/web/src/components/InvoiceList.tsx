import type { Invoice } from "@mf/shared";

function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  return (
    <ul aria-label="Invoices">
      {invoices.map((inv) => (
        <li key={inv.id}>
          <strong>{inv.customerName}</strong> — {formatMoney(inv.amountCents)} — {inv.status}
        </li>
      ))}
    </ul>
  );
}
