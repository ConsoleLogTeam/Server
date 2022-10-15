import { z } from "zod";

export const getLocalitiesQuerySchema = z.object({
    name: z.string().optional(),
    province: z.string().optional(),
});
