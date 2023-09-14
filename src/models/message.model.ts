import { IChat } from './chat.model';
import { IUser } from './user.model';
import mongoose, { Schema } from "mongoose";


export interface IMessage {
    id_chat: string | IChat;
    sender: string;
    receiver: string;
    message: string;
    timestamp: string;
    readBy?: string[];
}

const messageSchema = new mongoose.Schema<IMessage>({
    id_chat:{type: Schema.Types.ObjectId, ref: "Chat", required: true},
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, required: true },
    readBy: [{ type: String }],
},{collection: 'Messages'});

export const MessageModel = mongoose.model<IMessage>("Message", messageSchema);
