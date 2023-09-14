import { IMessage } from './../../models/message.model';
import { ChatModel, IChat } from "./../../models/chat.model";
import mongoose from 'mongoose';

export async function newChat({ participants, messages }: IChat): Promise<IChat> {

    const chat: IChat = { participants }
    if (messages) {
        chat.messages = messages
    }
    const part = Array.isArray(participants) && participants.map(participant => new mongoose.Types.ObjectId(participant))
    const existChat = await ChatModel.find(part ? { participants: { $all: part } } : {});

    console.log("exists chat", existChat)
    if (existChat.length !== 0) {
        return existChat[0]
    }
    else {
        const Doc = new ChatModel(chat);
        await Doc.save();
        return Doc;
    }


}

export async function getChats(participants?: string[]): Promise<IChat[]> {
    

    const part = Array.isArray(participants) && participants.map(participant => new mongoose.Types.ObjectId(participant))
    const chats = await ChatModel.find(part ? { participants: { $all: part } } : {});
    
    console.log(chats)
    return chats;
}
