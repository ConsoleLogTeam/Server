"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModel = void 0;
const { NODE_ENV = "dev" } = process.env;
class ErrorModel {
    constructor() { }
    new(status, cause, message) {
        this.status = status || 0;
        this.cause = cause || "";
        this.message = message || [];
    }
    newInterlanServerError(message) {
        this.status = 500;
        this.cause = "Internal Server Error";
        this.message = message;
        return this;
    }
    newBadRequest(message) {
        this.status = 400;
        this.cause = "Bad Request";
        this.message = message;
        return this;
    }
    newNotFound(message) {
        this.cause = "Not Found";
        this.status = 404;
        this.message = message;
        return this;
    }
    newUnauthorized(message) {
        this.cause = "Unauthorized";
        this.status = 401;
        this.message = message;
        return this;
    }
    print() {
        if (NODE_ENV === "dev") {
            console.log(`
        Error: ${this.status}
        Cause: ${this.cause}
        Message: ${this.message}`);
        }
        return this;
    }
    send(res) {
        this.print();
        return res
            .status(this.status)
            .json({ message: this.message, cause: this.cause });
    }
}
exports.ErrorModel = ErrorModel;
