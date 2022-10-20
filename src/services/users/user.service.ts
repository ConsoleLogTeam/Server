import { UserModel, IUser } from "../../models/user.model";
import jwt from "jsonwebtoken";
import { generateToken } from "../../helpers/jwt";
import { UserType } from "../../helpers/constants";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";
export async function authenticate({ email, password }: { email: string; password: string }) {
    const user = await UserModel.findOne({
        email,
    });

    if (!user) {
        throw new Error("Usuario Inexistente");
    }
    const hashResult = await bcrypt.compare(password, user.password);

    if (!hashResult) {
        throw new Error("Contraseña incorrecta");
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
    phone?: string;
    email: string;
    userType: UserType;
    docType: string;
    document: string;
    plans?: string[];
    country: string;
    province: string;
    locality: string;
    address?: string;
}): Promise<IUser> {
    const hash = await bcrypt.hash(document, 12);

    const doc = new UserModel({
        firstname,
        lastname,
        phone,
        email,
        userType,
        username: document,
        password: hash,
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

export async function getUsers(itemsPerPage?: number, cursor?: string) {
    const users = UserModel.find().sort({ createdAt: 1 });

    if (cursor !== undefined) {
        users.find({ _id: { $gt: new Types.ObjectId(cursor) } });
    }

    users
        .limit(itemsPerPage ?? 5)
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

export async function decrementRemainingClasses(document: string, decrementClasses: number = 1) {
    return await UserModel.updateOne({ document }, { remainingClasses: { $inc: -decrementClasses } });
}

export async function updateUserById(
    id: string,
    userObject: {
        firstname: string;
        lastname: string;
        phone: string;
        email: string;
        userType: string;
        docType: string;
        document: string;
        country: string;
        province: string;
        locality: string;
        address: string;
    }
) {
    return await UserModel.updateOne(
        { _id: id },
        {
            firstname: userObject.firstname,
            lastname: userObject.lastname,
            phone: userObject.phone,
            email: userObject.email,
            userType: userObject.userType,
            docType: userObject.docType,
            document: userObject.document,
            country: userObject.country,
            province: userObject.province,
            locality: userObject.locality,
            address: userObject.address,
        }
    );
}
