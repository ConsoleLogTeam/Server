import { Controller, Get, Post, Req, Res } from "routing-controllers";
import { Service } from "typedi";
import { Request, Response } from "express";
import { messageSchema } from "../../utils/validations/message.schema";
import * as messageService from "../../services/message/message.service";
import { io } from "../../..";
import { usersCon } from "../../..";




@Controller("/message")
@Service()
export default class MessageController {
  @Post()
  async newMessage(@Req() req: Request, @Res() res: Response) {
    try {
      const chatBody = await messageSchema.parseAsync(req.body);
      const newMessage = await messageService.newMessage(chatBody);

      const messages = await messageService.getMessagesByChatId(newMessage)
      // console.log("mensajes",messages)
      const chatId = newMessage.id_chat.toString();


      const receiverSocketId = Array.from(usersCon.entries()).find(
        ([_, userId]) => userId === req.body.receiver)?.[0];
      const senderSocketId = Array.from(usersCon.entries()).find(([_, userId]) => userId === req.body.sender)?.[0];
      console.log("asdasdasd", receiverSocketId)

      const senderId = Array.from(usersCon.entries()).find(([_, userId]) => userId === req.body.sender)?.[1];
      const receiverId = Array.from(usersCon.entries()).find(([_, userId]) => userId === req.body.receiver)?.[1];
        console.log("sender",senderId)
        console.log("receiver",receiverId)
        
      io.to(senderSocketId).emit("chat", { chatId, messages, senderId, receiverId })
      io.to(receiverSocketId).emit("chat", { chatId, messages, senderId, receiverId })
      // io.emit("messageSend", messages);asd




      return res.status(200).json({
        message: "Mensaje Cargado",
        newMessage: {
          id_chat: newMessage.id_chat,
          sender: newMessage.sender,
          receiver: newMessage.receiver,
          message: newMessage.message,
          timestamp: newMessage.timestamp,
          readBy: newMessage.readBy
        },
      });

    } catch (error) {
      console.log(error);
    }
  }

  @Post("/getMessagesByChatId")
  async getMessages(@Req() req: Request, @Res() res: Response) {
    try {
      console.log(req.body);
      const messages = await messageService.getMessagesByChatId(req.body);
      // console.log(messages)

      return res.status(200).json(messages);
    } catch (error) {
      console.log(error);
    }
  }
}