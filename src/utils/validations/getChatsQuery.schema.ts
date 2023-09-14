import { z } from "zod";


export const getChatsQuerySchema = z.object({
    participants: z.string().regex(new RegExp("^[0-9a-fA-F]{24}$"), "Debe ser un id valido").array().optional(),
});

