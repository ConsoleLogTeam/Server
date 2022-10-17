import { z } from "zod";

export const getPlansQuerySchema = z.object({
    user: z.string().trim().regex(new RegExp("^[0-9a-fA-F]{24}$"), "Debe ser un id valido").optional(),
});

//EXPRESSION ID MONGO
// .regex(new RegExp(^[0-9a-fA-F]{24}$), "")
