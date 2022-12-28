export const RECENT_LOADING = "RECENT_LOADING";
export const RECENT_ERROR = "RECENT_ERROR";
export const ADD_RECENT_CHAT = "ADD_RECENT_CHAT";
export const NEW_CREATED_CHAT = "NEW_CREATED_CHAT";
import { CompareArrayMembers, GetArrayIdFromArrayObject } from "../../../Helpers/HelperFunctions";
import { createNewChatroom, getAllChatroom } from "../../../Services/chat";
import { addMessage, selectChat } from "../Chatting/action";
export const recentLoading = (payload) => ({ type: RECENT_LOADING, payload });
export const recentError = (payload) => ({ type: RECENT_ERROR, payload });
export const recentChatResult = (payload) => ({
  type: ADD_RECENT_CHAT,
  payload,
});
export const newCreatedChat = (payload) => ({
  type: NEW_CREATED_CHAT,
  payload,
});

export const makeRecentChatApi = (user_id) => async (dispatch) => {
  recentLoading(true);
  try {
    let res = await getAllChatroom(user_id);
    dispatch(recentChatResult(res));
    //dispatch(addMessage(res[0].messages));
  } catch (err) {
    dispatch(recentError(true));
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

export const accessChat = (payload, recentchat) => async (dispatch) => {
  dispatch(recentLoading(true));
  try {
    const data = recentchat.find((el) => CompareArrayMembers(GetArrayIdFromArrayObject(el?.members), GetArrayIdFromArrayObject(payload?.members)));
    console.log(data);
    if (!data) {
      let res = await createNewChatroom(payload);
      dispatch(newCreatedChat(res));
      dispatch(
        selectChat({
          type: res?.type,
          chatroom_title: res?.chatroom_title,
          members: res?.members,
          profile_picture: res?.profile_picture,
          _id: res._id,
          index: 0,
        })
      );
      return;
    }
    else {
      dispatch(
        selectChat({
          type: data?.type,
          chatroom_title: data?.chatroom_title,
          members: data?.members,
          profile_picture: data?.profile_picture,
          _id: data._id,
          index: 0,
        })
      );
    }
    dispatch(recentLoading(false));
  } catch (err) {
    dispatch(recentError(true));
    console.log(err.message);
  }
};
