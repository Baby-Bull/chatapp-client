import { Avatar, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import InputEmoji from "react-input-emoji";
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import React, { createRef, useCallback, useEffect, useState } from "react";
import { ChatlogicStyling, isSameSender } from "./ChatstyleLogic";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentMessages, sendMessageApi } from "./Redux/Chatting/action";
import { sendMessage } from "./Redux/Chatting/action";
import { addUnseenmsg } from "./Redux/Notification/action";
import webSocket from "../Utils/socket";

import socketResult from "../Utils/socket";
import dayjs from "dayjs";
import { ImageUpload } from "./MiniComponents/ImageUpload";
import CallingSentPanel from "./MiniComponents/CallingSentPanel";
import CallingReceivedPanel from "./MiniComponents/CallingReceivedPanel";

var socket, currentChattingWith;

export const ChattingPage = () => {
  const { user, token } = useSelector((store) => store.user);
  var { unseenmsg } = useSelector((store) => store.notification);
  const {
    chatting: {
      type,
      chatroom_title,
      profile_picture,
      members,
      lastest_message,
      _id,
    },
    messages
  } = useSelector((store) => store.chatting);

  const scrolldiv = createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const handleMessage = (rev_message) => {
      dispatch(sendMessage(rev_message))
      // InputContWithEmog(user?._id, _id)
    }
    webSocket.on("personal_message_from_server", handleMessage);

    return () => {
      webSocket.off("personal_message_from_server", handleMessage);
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    //_id is of selected chat so that user can join same chat room
    if (!_id) return;
    dispatch(fetchCurrentMessages(_id, token, socket));
    currentChattingWith = _id;
  }, [_id]);

  useEffect(() => {
    const abortController = new AbortController();
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrolldiv.current);
  });

  // useEffect(() => {
  //   // socket.on("message recieved", (newMessage) => {
  //   //   if (!currentChattingWith || currentChattingWith !== newMessage.chat._id) {
  //   //     handleNotyfy(newMessage);
  //   //   } else {
  //   //     dispatch(sendMessage(newMessage));
  //   //   }
  //   // });
  // }, []);

  const handleNotyfy = (newMessage) => {
    dispatch(addUnseenmsg(newMessage));
  };

  return (
    <div className="chattingpage">
      <div className="top-header">
        <div className="user-header">
          <Avatar src={type === "group" ? profile_picture : "P"} />
          <p className="user-name">{type === "group" ? chatroom_title : user?.username}</p>
        </div>
        <div>
          <div className="user-fet">
            <SearchIcon />
            <CallIcon />
            <VideoCallIcon />
            <MoreHorizIcon />
          </div>
        </div>
      </div>
      <div ref={scrolldiv} className="live-chat">
        {messages?.map((el, index) => (
          <div
            key={index}
            className={
              el.sender_id !== user._id ? "rihgtuser-chat" : "leftuser-chat"
            }
          >
            <div
              className={el.sender_id !== user._id ? "right-avt" : "left-avt"}
            >
              <div className={ChatlogicStyling(el.sender_id, user._id)}>
                <p>{el.content}</p>
                <p className="time chat-time">
                  {new Date(el.createdAt).getHours() +
                    ":" +
                    new Date(el.createdAt).getMinutes()}
                </p>
              </div>

              {isSameSender(messages, index) ? (
                <Avatar
                  //src={el.sender_id != user._id ? el.sender.pic : user.pic}
                  src={""}
                />
              ) : (
                <div className="blank-div"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sender-cont">
        <InputContWithEmog
          _sender_id={user._id}
          id={_id}
          token={token}
        />
      </div>
      {/* <CallingSentPanel /> */}
      {/* <CallingReceivedPanel /> */}
    </div>
  );
};

const ColorButton = styled(Button)(() => ({
  color: "white",
  fontSize: "20px",
  textTransform: "none",
  padding: "12px",
  marginRight: "15px",
  backgroundColor: "#5865f2",
  "&:hover": {
    backgroundColor: "#3a45c3",
  },
}));

function InputContWithEmog({ _sender_id, id }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const instancePayload = {
    message_type: "personal_message_from_client",
    content: text,
    content_type: "text", // to-do modify attribute to match with any type of input (file, image, text ...)
    chatroom_id: id,
    sender_id: _sender_id,
    createdAt: dayjs()
  }

  const handleSentMessageToServer = () => {
    socketResult.emit(instancePayload);
  }
  function handleOnEnter(text) {
    handleSentMessageToServer();
    dispatch(
      sendMessageApi(
        instancePayload,
      )
    );
  }
  function handleChatClick() {
    handleSentMessageToServer();
    dispatch(
      sendMessageApi(
        instancePayload,
      )
    );
    setText("");
  }
  return (
    <>
      <div className="search-cont send-message">
        <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
        <ImageIcon />
        <AttachFileIcon />
      </div>
      <ImageUpload />
      <ColorButton
        onClick={handleChatClick}
        variant="contained"
        endIcon={<SendIcon />}
      ></ColorButton>
    </>
  );
}
