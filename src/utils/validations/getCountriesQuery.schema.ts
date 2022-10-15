import { z } from "zod";

export const getCountriesQuerySchema = z.object({
    name: z.string().optional(),
});
