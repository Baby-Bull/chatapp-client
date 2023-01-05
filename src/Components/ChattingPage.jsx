import { Avatar, Box, Button, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from '@mui/icons-material/Download';
import InputEmoji from "react-input-emoji";
import React, { createRef, useEffect, useState } from "react";
import { ChatlogicStyling, isSameSender } from "./ChatstyleLogic";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentMessages, sendMessageApi } from "./Redux/Chatting/action";
import { sendMessage } from "./Redux/Chatting/action";
import { addUnseenmsg } from "./Redux/Notification/action";
import webSocket from "../Utils/socket";

import dayjs from "dayjs";
import { FileUpload } from "./MiniComponents/FileUpload";
import { getFileNameFromURL, UploadFileToFirebase } from "../Helpers/UploadFileToFirebase";
import CallingSentPanel from "./MiniComponents/CallingSentPanel";

var socket, currentChattingWith;
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


export const ChattingPage = () => {
  const scrolldiv = createRef();
  const dispatch = useDispatch();
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
  const currentFriend = members?.find((el) => (el?._id !== user?._id));


  const [openCallingSentPanel, setOpenCallingSentPanel] = useState(false);

  useEffect(() => {
    const handleMessage = (rev_message) => {
      dispatch(sendMessage(rev_message))
      // InputContWithEmog(user?._id, _id)
    }
    webSocket.on("personal_message_from_server", handleMessage);
    webSocket.on("reject_call_request_from_server", () => setOpenCallingSentPanel(false));
    webSocket.on("accept_call_request_from_server", () => {
      setOpenCallingSentPanel(false);
      window.open('/meeting', '_blank');
    });

    return () => {
      webSocket.off("personal_message_from_server", handleMessage);
      webSocket.off("reject_call_request_from_server", () => setOpenCallingSentPanel(false));
      webSocket.off("accept_call_request_from_server", () => {
        setOpenCallingSentPanel(false);
        window.open('/meeting', '_blank');
      });
    }
  }, []);

  useEffect(() => {
    //_id is of selected chat so that user can join same chat room
    if (!_id) return;
    dispatch(fetchCurrentMessages(_id, token, socket));
    currentChattingWith = _id;
  }, [_id]);

  useEffect(() => {
    const scrollToBottom = (node) => {
      node.scrollTop = node.scrollHeight;
    };
    scrollToBottom(scrolldiv.current);
  });

  const handleNotyfy = (newMessage) => {
    dispatch(addUnseenmsg(newMessage));
  };

  return (
    <Box
      className="chattingpage"
      sx={{
        bgcolor: "chattingPageBg.default",
        color: "chattingPageTopText.default",
      }}
    >
      <Box
        className="top-header"
        sx={{
          bgcolor: "background.default",
          color: "chattingPageTopText.default",
        }}
      >
        <Box className="user-header">
          <Avatar src={type === "group" ? profile_picture : currentFriend?.avatar} />
          <p className="user-name">{type === "group" ? chatroom_title : currentFriend?.username}</p>
        </Box>
        <Box>
          <Box className="user-fet">
            <SearchIcon />
            <CallIcon
              onClick={() => {
                setOpenCallingSentPanel(true);
                webSocket.emit({
                  message_type: "call_request_from_client",
                  chatroom_id: _id,
                  sender_id: user?._id,
                  createdAt: dayjs()
                });
              }
              }
            />
            <VideoCallIcon />
            <MoreHorizIcon />
          </Box>
        </Box>
      </Box>
      <Box
        ref={scrolldiv}
        className="live-chat"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {messages?.map((el, index) => (
          <Box
            key={index}
            className={el.sender_id !== user._id ? "rihgtuser-chat" : "leftuser-chat"}
          >
            <Box className={el.sender_id !== user._id ? "right-avt" : "left-avt"}>
              <Box
                className={ChatlogicStyling(el.sender_id, user._id)}
                sx={{
                  bgcolor: "chattingPageLeftUserBg.default"
                }}
              >
                {
                  {
                    "text": <p>{el.content}</p>,
                    "image": <embed
                      className="img_message"
                      src={el.content}
                      alt=""
                    />,
                    "file": <a
                      style={{ textDecoration: "none" }}
                      href={el.content}
                      target="_blank">
                      <Box className="file_message">
                        <Box className="texts">
                          <span className="first_text">Click to download file</span>
                          <span className="second_text">{getFileNameFromURL(el?.content)}</span>
                        </Box>
                        <DownloadIcon className="icon_download" />
                      </Box>
                    </a>,
                    "audio":
                      <audio controls>
                        <source src={el?.content} type="audio/mpeg" />
                        Your browser does not support the html audio tag.
                      </audio>
                  }
                  [el.content_type]
                }
                <p className="time chat-time">
                  {new Date(el.createdAt).getHours() +
                    ":" +
                    new Date(el.createdAt).getMinutes()}
                </p>
              </Box>
              {isSameSender(messages, index) ? (
                <Avatar
                  src={el.sender_id != user._id ? currentFriend?.avatar : user.avatar}
                />
              ) : (
                <div className="blank-div"></div>
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        className="sender-cont"
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <InputContWithEmog
          _sender_id={user._id}
          id={_id}
          token={token}
        />
      </Box>
      {openCallingSentPanel &&
        <CallingSentPanel
          setOpenCallingSentPanel={setOpenCallingSentPanel}
          chatroom_id={_id}
          sender_id={user._id}
          currentFriend={currentFriend}
        />}
    </Box >
  );
};

function InputContWithEmog({ _sender_id, id }) {
  const [content_input, setContent] = useState("");
  const [content_type, setContent_type] = useState("text");
  const [selectedFile, setSelectedFile] = useState();
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  let instancePayload = {
    message_type: "personal_message_from_client",
    content: content_input,
    content_type: content_type || "text", // to-do modify attribute to match with any type of input (file, image, text ...)
    chatroom_id: id,
    sender_id: _sender_id,
    createdAt: dayjs()
  }

  async function handleSendMessage() {
    const tempRes = selectedFile ? await UploadFileToFirebase(selectedFile) : null;
    setSelectedFile(selectedFile);
    setProgress(tempRes?.progress)
    instancePayload = {
      ...instancePayload,
      content: selectedFile ? tempRes?.url : content_input,
    }
    webSocket.emit(instancePayload);
    dispatch(
      sendMessageApi(instancePayload)
    );
    setContent("");
    setContent_type("text");
    setProgress(0);
    setSelectedFile(null);
  }


  async function handleSendRecordMessage(content_url_record) {
    instancePayload = {
      ...instancePayload,
      content: content_url_record,
      content_type: "audio"
    }
    webSocket.emit(instancePayload);
    dispatch(
      sendMessageApi(instancePayload)
    );
    setContent("");
    setContent_type("text");
    setProgress(0);
  }


  return (
    <>
      <div className="search-cont send-message">
        <InputEmoji
          value={content_input}
          onChange={setContent}
          cleanOnEnter
          onEnter={handleSendMessage}
          placeholder="Type a message"
        />
      </div>
      <FileUpload
        setContent_type={setContent_type}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        progress={progress}
        handleSendRecordMessage={handleSendRecordMessage}
      />
      <ColorButton
        onClick={handleSendMessage}
        variant="contained"
        endIcon={<SendIcon />}
      ></ColorButton>
    </>
  );
}
