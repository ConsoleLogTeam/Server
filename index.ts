import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import path from "path";
import cors from "cors";
import * as mongoConnection from "./src/configs/mongoose";
import "./src/models/locality.model.ts";
import "./src/models/country.model.ts";
import "./src/models/province.model.ts";

(async () => {
    dotenv.config();

    const app: Express = express();

    const port = process.env.PORT;

    useContainer(Container);
    app.use(express.json());
    app.use(cors());

    mongoConnection.initializeMongoose();

    const controllersPath = "./src/controllers/**/*.controller.ts";

    useExpressServer(app, {
        controllers: [path.join(__dirname, controllersPath)],
    });

    app.listen(port, () => {
        console.log("---------------------------------------------------------------");
        console.log(`⚡️[GYM] [Server]: Server is running at https://localhost:${port}`);
    });
})();
