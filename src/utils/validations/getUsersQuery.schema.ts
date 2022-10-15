import { z } from "zod";

export const getUsersQuerySchema = z.object({
    document: z.string().optional(),
    firstname: z.string().optional(),
});
