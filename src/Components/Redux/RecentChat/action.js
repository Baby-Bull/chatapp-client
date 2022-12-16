export const RECENT_LOADING = "RECENT_LOADING";
export const RECENT_ERROR = "RECENT_ERROR";
export const ADD_RECENT_CHAT = "ADD_RECENT_CHAT";
export const NEW_CREATED_CHAT = "NEW_CREATED_CHAT";
import { getAllChatroom } from "../../../Services/chat";
import { addMessage, selectChat } from "../Chatting/action";
export const recentLoding = (payload) => ({ type: RECENT_LOADING, payload });
export const recentError = (payload) => ({ type: RECENT_ERROR, payload });
export const recentChatResult = (payload) => ({
  type: ADD_RECENT_CHAT,
  payload,
});
export const newCreatedChat = (payload) => ({
  type: NEW_CREATED_CHAT,
  payload,
});

export const makeRecentChatApi = (token, user_id) => async (dispatch) => {
  recentLoding(true);
  try {
    let res = await getAllChatroom(user_id);
    dispatch(recentChatResult(res));
    //dispatch(addMessage(res[0].messages));
  } catch (err) {
    dispatch(recentError(true));
    console.log(err.message);
  }
};

export const makeNewGroup = (group_data, token) => async (dispatch) => {
  recentLoding(true);
  const url = `http://localhost:8000/chat/group`;
  try {
    let res = await fetch(url, {
      method: "post",
      body: JSON.stringify(group_data),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    dispatch(newCreatedChat(data));
  } catch (err) {
    dispatch(recentError(true));
    console.log(err.message);
  }
};

export const accessChat = (userId, token, recentchat) => async (dispatch) => {
  dispatch(recentLoding(true));
  const url = `http://localhost:8000/chat`;
  try {
    let res = await fetch(url, {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await res.json();
    if (!recentchat.find((el) => el._id === data._id)) {
      dispatch(newCreatedChat(data));
      dispatch(
        selectChat({

          isGroupChat: data.isGroupChat,
          index: 0,
          user: data.users.find((el) => el._id == userId),
          _id: data._id,
          chatName: data.chatName,
        })
      );
      return;
    }
    dispatch(recentLoding(false));
    dispatch(
      selectChat({
        isGroupChat: data.isGroupChat,
        index: 0,
        user: data.users.find((el) => el._id == userId),
        _id: data._id,
        chatName: data.chatName,
      })
    );
  } catch (err) {
    dispatch(recentError(true));
    console.log(err.message);
  }
};
