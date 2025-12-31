import "./App.css";
import { InvoiceList } from "./components/InvoiceList";
import { useInvoices } from "./features/invoices/useInvoices";

export default function App() {
  const state = useInvoices();

  if (state.status === "loading") return <p>Loading invoices…</p>;
  if (state.status === "error") return <p role="alert">Error: {state.error}</p>;

  return (
    <main>
      <h1>Invoices</h1>
      <InvoiceList invoices={state.data} />
    </main>
  );
}

