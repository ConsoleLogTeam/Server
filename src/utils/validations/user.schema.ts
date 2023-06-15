import { z } from "zod";
import { DocType, UserType } from "../../helpers/constants";

export const userSchema = z.object({
    firstname: z.string().max(25, "Max 25 characters in Firstname"),
    lastname: z.string().max(25, "Max 25 characters in Lastname"),
    phone: z.string().max(15, "Max 15 characters in Phone").optional(),
    email: z.string().email("Must be a valid email"),
    userType: z.nativeEnum(UserType),
    docType: z.nativeEnum(DocType),
    document: z.string().max(10, "Max 10 characters in Document").min(7, "Min 7 characters in Document"),
    country: z.string(),
    province: z.string(),
    locality: z.string(),
    birthdate: z.string(),
    profilephoto: z.string().optional(),
    address: z.string().max(80, "Max 80 characters in Address"),
});
