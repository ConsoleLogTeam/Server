import { z } from "zod";

export const getUsersQuerySchema = z.object({
    itemsPerPage: z
        .string()
        .refine((n) => {
            const number = parseInt(n);
            if (Number.isNaN(number)) {
                return false;
            }
            return number > 1 && number <= 10;
        })
        .optional(),
    cursor: z.string().optional(),
});
