"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.authenticate = void 0;
const user_model_1 = require("../../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function authenticate({ email, password, }) {
    const user = await user_model_1.UserModel.findOne({
        email,
        password,
    });
    if (!user) {
        throw new Error("Usuario Inexistente");
    }
    let token = jsonwebtoken_1.default.sign({ email }, "secret123");
    const { username } = user;
    return { token, username };
}
exports.authenticate = authenticate;
async function register({ username, firstname, lastname, email, password, phone, document, }) {
    await user_model_1.UserModel.create({
        username,
        firstname,
        lastname,
        email,
        password,
        phone,
        document,
    });
}
exports.register = register;
