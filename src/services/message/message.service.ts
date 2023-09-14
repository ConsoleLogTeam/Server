import { IChat } from "../../models/chat.model";
import { IMessage, MessageModel } from "../../models/message.model";



export async function newMessage({ id_chat, sender, receiver, message, timestamp, readBy }: IMessage): Promise<IMessage> {
    const newMessage: IMessage = { id_chat, sender, receiver, message, timestamp }
    if (readBy) {
        newMessage.readBy = readBy
    }
    const Doc = new MessageModel(newMessage);
    await Doc.save();
    return Doc;
}


export async function getMessagesByChatId({ id_chat }: IMessage): Promise<IMessage[] | []> {
    const filters: { id_chat?: string | IChat } = {};
    if (id_chat !== undefined) {
        filters.id_chat = id_chat;
        const messages = await MessageModel.find(filters)
        return messages;
    }
    return []


}
