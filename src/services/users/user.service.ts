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
    username,
    userType,
    firstname,
    lastname,
    email,
    password,
    phone,
    document,
    plans,
}: {
    username: string;
    userType: UserType;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    document: string;
    plans: string[];
}): Promise<IUser> {
    const doc = new UserModel({
        username,
        userType,
        firstname,
        lastname,
        email,
        password,
        phone,
        document,
        plans,
    });

    await doc.save();
    return doc;
}

export async function getUsers() {
    const users = UserModel.find().populate({
        path: "plans",
        populate: {
            path: "planDetails",
            populate: {
                path: "exercise",
                populate: "muscleGroup",
            },
        },
    });
    return users;
}

export async function getUserById(id: string) {
    const user = UserModel.findById(id).populate({
        path: "plans",
        populate: {
            path: "planDetails",
            populate: {
                path: "exercise",
                populate: "muscleGroup",
            },
        },
    });

    return user;
}
