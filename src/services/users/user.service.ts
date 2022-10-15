import { UserModel, IUser } from "../../models/user.model";
import jwt from "jsonwebtoken";
import { generateToken } from "../../helpers/jwt";
import { UserType } from "../../helpers/constants";

export async function authenticate({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({
        email,
        password,
    });

    if (!user) {
        throw new Error("Usuario Inexistente");
    }
    let token = generateToken({
        sub: user._id.toString(),
        userType: UserType.ADMINISTRADOR,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
    });

    const { username } = user;
    return { token, username };
}

export async function register({
    firstname,
    lastname,
    phone,
    email,
    userType,
    username,
    password,
    docType,
    document,
    plans,
    country,
    province,
    locality,
    address,
}: {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    userType: UserType;
    username: string;
    password: string;
    docType: string;
    document: string;
    plans: string[];
    country: string;
    province: string;
    locality: string;
    address: string;
}): Promise<IUser> {
    const doc = new UserModel({
        firstname,
        lastname,
        phone,
        email,
        userType,
        username,
        password,
        docType,
        document,
        plans,
        country,
        province,
        locality,
        address,
    });

    await doc.save();
    return doc;
}

export async function getUsers(document: string | undefined, firstname: string | undefined) {
    const filters: { document?: string; firstname?: string } = {};
    if (document !== undefined) {
        filters.document = document;
    }
    if (firstname !== undefined) filters.firstname = firstname;

    const users = UserModel.find(filters)
        .populate({
            path: "plans",
            populate: {
                path: "planDetails",
                populate: {
                    path: "exercise",
                    populate: "muscleGroup",
                },
            },
        })
        .populate({ path: "locality" })
        .populate({ path: "country" })
        .populate({ path: "province" });
    return users;
}

export async function getUserById(id: string) {
    const user = UserModel.findById(id)
        .populate({
            path: "plans",
            populate: {
                path: "planDetails",
                populate: {
                    path: "exercise",
                    populate: "muscleGroup",
                },
            },
        })
        .populate({ path: "locality" })
        .populate({ path: "country" })
        .populate({ path: "province" });
    return user;
}
