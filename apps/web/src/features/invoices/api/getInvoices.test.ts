import { describe, it, expect, vi, afterEach } from "vitest";
import { getInvoices } from "./getInvoices";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getInvoices", () => {
  it("returns invoices when the payload is valid", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      return new Response(
        JSON.stringify({
          data: [
            { id: "inv_001", customerName: "Acme Co", amountCents: 12500, status: "unpaid" }
          ]
        }),
        { status: 200 }
      );
    }));

    const invoices = await getInvoices();
    expect(invoices).toHaveLength(1);
    expect(invoices[0].id).toBe("inv_001");
  });

  it("throws when the payload is invalid", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      return new Response(JSON.stringify({ data: [{ id: "" }] }), { status: 200 });
    }));

    await expect(getInvoices()).rejects.toThrow(/schema validation/i);
  });

  it("throws on non-2xx response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => {
      return new Response("nope", { status: 500, statusText: "Server Error" });
    }));

    await expect(getInvoices()).rejects.toThrow(/Failed to fetch invoices/i);
  });
});
