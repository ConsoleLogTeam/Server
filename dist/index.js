"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = __importDefault(require("typedi"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
(async () => {
    dotenv_1.default.config();
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    (0, routing_controllers_1.useContainer)(typedi_1.default);
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    mongoose_1.default.connect(process.env.DATABASE);
    const controllersPath = "./src/controllers/**/*.controller.ts";
    (0, routing_controllers_1.useExpressServer)(app, {
        controllers: [path_1.default.join(__dirname, controllersPath)],
    });
    app.listen(port, () => {
        console.log(`⚡️[Server]: Server is running at https://localhost:${port}`);
    });
})();
