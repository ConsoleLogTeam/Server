import { z } from "zod";

export const exerciseSchema = z.object({
    name: z.string().max(100),
    muscleGroup: z.string(),
});
