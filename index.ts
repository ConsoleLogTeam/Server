import "reflect-metadata";
import express, { Express } from "express";
import dotenv from "dotenv";
import { useContainer, useExpressServer } from "routing-controllers";
import Container from "typedi";
import path from "path";
import cors from "cors";
import * as mongoConnection from "./src/configs/mongoose";
import "./src/models/locality.model.ts";
import "./src/models/country.model.ts";
import "./src/models/province.model.ts";
import cron from "node-cron";
import SchedulerService from "./src/controllers/scheduler/scheduler.service.controller";

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
    // DOMINGO A LAS 23:59:59 SE REINICIA EL CONTADOR DE CLASES POR SEMANA
    // cron.schedule("59 59 23 * * 7", () => {
    //     const scheduler = Container.get<SchedulerService>("scheduler");
    //     scheduler.test();
    // // });
    // cron.schedule("59 * * * * *", async () => {
    //     const scheduler = Container.get<SchedulerService>("scheduler");
    //     await scheduler.ResetRemainingClasses();
    // });
})();
