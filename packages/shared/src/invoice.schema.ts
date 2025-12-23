import { z } from "zod";

export const InvoiceSchema = z.object({
  id: z.string().min(1),
  customerName: z.string().min(1),
  amountCents: z.number().int().min(0),
  status: z.enum(["paid", "unpaid"])
});

export const InvoicesResponseSchema = z.object({
  data: z.array(InvoiceSchema)
});

export type Invoice = z.infer<typeof InvoiceSchema>;
