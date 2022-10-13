import { z } from "zod";

export const muscleGroupSchema = z.object({
    name: z.string().max(100),
});
