import { createNewMessage, getAllMessagesInChatRoom } from "../../../Services/chat";

export const SELECT_CHAT = "SELECT_CHAT";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const MESSAGE_LOADING = "MESSAGE_LOADING";
export const MESSAGE_ERROR = "MESSAGE_ERROR";
export const SEND_MESSAGE = "SEND_MESSAGE";

export const selectChat = (payload) => ({ type: SELECT_CHAT, payload });
export const addMessage = (payload) => ({ type: ADD_MESSAGE, payload });
export const messageLoading = (payload) => ({ type: MESSAGE_LOADING, payload });
export const messageError = (payload) => ({ type: MESSAGE_ERROR, payload });
export const sendMessage = (payload) => ({ type: SEND_MESSAGE, payload });

export const fetchCurrentMessages = (id, token, socket) => async (dispatch) => {
  dispatch(messageLoading(true));
  try {
    let data = await getAllMessagesInChatRoom(id);
    //socket.emit("join chat", id);
    dispatch(addMessage(data));
  } catch (err) {
    console.log(err);
    dispatch(messageError(true));
  }
};

export const sendMessageApi = (payload, token, socket) => async (dispatch) => {
  try {
    // const data = await createNewMessage(payload)
    // console.log(data);
    // socket.emit("new message", data);
    dispatch(sendMessage(payload));
    return payload;
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
