import { z } from "zod";

export const planDetailSchema = z.object({
    exercise: z.string(),
    series: z.number().gte(1).lte(20),
    repetitions: z.number().gte(1).lte(50),
    observations: z.string(),
});
