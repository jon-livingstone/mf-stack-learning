import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /api/invoices", () => {
  it("returns a 200 response with data", async () => {
    const res = await GET();
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.data).toBeDefined();
    expect(Array.isArray(json.data)).toBe(true);
  });
});
