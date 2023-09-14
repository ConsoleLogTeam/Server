import { IMessage } from './message.model'
import mongoose, { Schema } from "mongoose";
import { IUser } from './user.model';




export interface IChat{
    _id?: string;
    participants:string[];
    messages?: IMessage[];
}

const chatSchema = new mongoose.Schema<IChat>({
    participants: [{type: Schema.Types.ObjectId, ref: "User"}],
    messages: [{type: Schema.Types.ObjectId, ref: "Message", default: []}],
},{collection:"Chats"});

export const ChatModel = mongoose.model<IChat>('Chat', chatSchema);