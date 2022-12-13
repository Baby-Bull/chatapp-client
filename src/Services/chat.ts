import { api } from "../Utils/api";


export const getAllUser = async () => {
    try {
        const res = await api.get('/users')
        return res.data;
    } catch (error) {
        return error;
    }
}

export const getAnUser = async (params: any) => {

}

export const getAllChatroom = async () => {
    try {
        const res = await api.get(`/chat-rooms`);
        return res.data;
    } catch (error) {
        return error
    }
}

export const getAllMessagesInChatRoom = async (chatId: any) => {
    try {
        const res = await api.get(`/messages`, { params: { chatroom_id: chatId } });
        return res.data;
    } catch (error) {
        return error;
    }
}