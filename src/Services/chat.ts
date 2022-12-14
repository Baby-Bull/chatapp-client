import { api } from "../Utils/api";


export const getAllUser = async () => {
    try {
        const res = await api.get('/users')
        return res.data;
    } catch (error) {
        return error;
    }
}

export const getAllChatroom = async (user_id: string = "") => {
    try {
        const res = await api.get(`/chat-rooms/byUserId/${user_id}`);
        return res.data;
    } catch (error) {
        return error
    }
}

export const getAllMessagesInChatRoom = async (chatId: any) => {
    try {
        const res = await api.get(`/messages/${chatId}`);
        return res.data;
    } catch (error) {
        return error;
    }
}

export const createNewChatroom = async (params: any) => {
    try {
        const res = await api.post(`/chat-rooms`, params);
        return res.data;
    } catch (error) {
        return error;
    }
}

export const createNewMessage = async (payload: any) => {
    try {
        const res = await api.post(`/messages`, payload)
        return res.data;
    } catch (error) {
        return error;
    }
}