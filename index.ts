
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
import { Server, Socket } from "socket.io"
import { createServer } from "http"
// import { createServer } from "https"


dotenv.config();

const app: Express = express();

const port = process.env.PORT;

useContainer(Container);

app.use(express.json());
const server = createServer(app);

app.use(
  cors({
    origin: "*", // Establece el origen permitido
    allowedHeaders: ["Content-Type", "Authorization"], // Establece los encabezados permitidos
    credentials: true, // Habilita el soporte para credenciales (cookies, encabezados de autorización, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"], // Establece los métodos HTTP permitidos
  })
);

mongoConnection.initializeMongoose();

const controllersPath = "./src/controllers/**/*.controller.ts";

useExpressServer(app, {
  controllers: [path.join(__dirname, controllersPath)],
});



// Crear la instancia del servidor de Socket.IO
export const io = new Server(server, {
  
  cors: {
    origin: "*",
  }
});



export const usersCon = new Map();
// Configurar la lógica del socket.io
io.on("connection", (socket: Socket) => {
  console.log("Usuario Conectado!", socket.id);

  socket.on("auth", (userId) => {
    usersCon.set(socket.id, userId)
    console.log("users", usersCon)
  })

  socket.on('disconnect', () => {
    // Elimina la asociación cuando el usuario se desconecta
    usersCon.delete(socket.id);
    console.log('Usuario desconectado:', socket.id);
  });

});



// Iniciar el servidor HTTP
server.listen(port, () => {
  console.log(`⚡️[GYM] [Server]: Server is running at http://localhost:${port}`);
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

