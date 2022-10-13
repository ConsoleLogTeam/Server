import { SignOptions, sign, verify, VerifyOptions } from "jsonwebtoken";
import express from "express";
import { UserType } from "./constants";

const { API_SECRET = "default" } = process.env;

const signInOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "7d",
};

export const generateToken = (data: any, options?: SignOptions): string =>
    sign(data, API_SECRET, options ?? signInOptions);

export function validateToken(token: string, options?: VerifyOptions): Promise<Payload> {
    return new Promise((resolve, reject) => {
        verify(token, API_SECRET, options ?? { algorithms: ["HS256"] }, (error, decoded: any) => {
            if (error) return reject(error);

            resolve(decoded);
        });
    });
}

interface Payload {
    sub: string;
    userType: UserType;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface RequestWithUser extends express.Request {
    user: Payload;
}
