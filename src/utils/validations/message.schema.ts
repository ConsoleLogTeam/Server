import { z } from "zod";

export const messageSchema = z.object({
    id_chat: z.string(),
    sender: z.string().max(100, "Max 100 characters"),
    receiver: z.string().max(100, "Max 100 characters"),
    message: z.string(),
    timestamp: z.string(),
    readby: z.string().array().optional(),
});
