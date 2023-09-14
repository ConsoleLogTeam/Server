import { chatSchema } from "./../../utils/validations/chat.schema";
import {
  Controller,
  Get,
  Res,
  Req,
  UseBefore,
  Post,
} from "routing-controllers";
import { Service } from "typedi";
import { authorize } from "../../middlewares/auth";
import { Request, Response } from "express";
import * as chatService from "../../services/chat/chat.service";
import { getChatsQuerySchema } from "../../utils/validations/getChatsQuery.schema";
import { io, usersCon } from "../../..";

@Controller("/chat")
@Service()
export default class ChatController {


  @Post("/newChat")
  async newChat(@Req() req: Request, @Res() res: Response) {
    try {
      const chatBody = await chatSchema.parseAsync(req.body);
      // console.log("pasa", chatBody);
      const chat = await chatService.newChat(chatBody);
      // console.log("chat traido",chat._id);
      const receiverSocketId = Array.from(usersCon.entries()).find(
        ([_, userId]) => userId === req.body.sender
      )?.[0];
      const senderSocketId = Array.from(usersCon.entries()).find(
        ([_, userId]) => userId === req.body.receiver
      )?.[0];
      io.to(senderSocketId).emit("newChat", chat._id)
      io.to(receiverSocketId).emit("newChat", chat._id)

      return res.status(200).json({
        message: "Chat Creado",
        chat: {
          _id: chat._id,
          participants: chat.participants,
          messages: chat.messages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Post("/getChats")
  async getChats(@Req() req: Request, @Res() res: Response) {
    try {
      // console.log("1",req.body);
      const chatBody = await getChatsQuerySchema.parseAsync(req.body);
      // console.log("2",chatBody.participants);
      const chats = await chatService.getChats(chatBody.participants);
      // console.log(chats)
      return res.status(200).json(chats);
      // return res.status(200).json({res:"hola"})
    } catch (error) {
      console.log(error);
    }
  }
}



