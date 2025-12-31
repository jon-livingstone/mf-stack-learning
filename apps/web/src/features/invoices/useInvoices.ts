import { useEffect, useState } from "react";
import type { Invoice } from "@mf/shared";
import { getInvoices } from "./api/getInvoices";

type State =
  | { status: "loading"; data: null; error: null }
  | { status: "error"; data: null; error: string }
  | { status: "success"; data: Invoice[]; error: null };

export function useInvoices(): State {
  const [state, setState] = useState<State>({ status: "loading", data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    getInvoices(controller.signal)
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === "AbortError") return;
        const message = e instanceof Error ? e.message : "Unknown error";
        setState({ status: "error", data: null, error: message });
      });

    return () => controller.abort();
  }, []);

  return state;
}
