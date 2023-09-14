import { z } from "zod";
import {messageSchema } from "./message.schema"
import { userSchema } from './user.schema';

export const chatSchema = z.object({
    participants: z.string().array(),
    messages: z.array(messageSchema).optional(),
});

