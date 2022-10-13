import { z } from "zod";
import { UserType } from "../../helpers/constants";

export const userSchema = z.object({
    username: z.string().max(25, "Max 25 characters in Username"),
    userType: z.nativeEnum(UserType),
    firstname: z.string().max(25, "Max 25 characters in Firstname"),
    lastname: z.string().max(25, "Max 25 characters in Lastname"),
    email: z.string().email("Must be a valid email"),
    password: z.string().max(25, "Max 25 characters in Password"),
    phone: z.string().max(15, "Max 15 characters in Phone"),
    document: z.string().max(10, "Max 10 characters in Document").min(7, "Min 7 characters in Document"),
    plans: z.string().array(),
});
