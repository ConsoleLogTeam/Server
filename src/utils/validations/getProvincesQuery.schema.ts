import { z } from "zod";

export const getProvincesQuerySchema = z.object({
    name: z.string().optional(),
    country: z.string().optional(),
});
