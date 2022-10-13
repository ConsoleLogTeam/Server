import { z } from "zod";

export const planSchema = z.object({
    name: z.string().max(100, "Max 100 characters"),
    days: z.number().positive().int().gte(30),
    planDetails: z.string().array().optional(),
});
