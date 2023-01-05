import { Avatar, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ChattingPage } from "./ChattingPage";
import { MyChat } from "./MyChat";
import CallingSentPanel from "./MiniComponents/CallingSentPanel";
import CallingReceivedPanel from "./MiniComponents/CallingReceivedPanel";
import SideNavbar from "./SideNavbar";
import webSocket from "../Utils/socket";


export const HomeComp = () => {
  const { user, loading, error } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);
  const currentFriend = chatting?.members?.find((el) => (el?._id !== user?._id));

  const [openCallingReceivedPanel, setOpenCallingReceivedPanel] = useState(false);

  useEffect(() => {
    webSocket.on("call_request_from_server", () => setOpenCallingReceivedPanel(true));
    webSocket.on("cancel_call_request_from_server", () => setOpenCallingReceivedPanel(false));

    return () => {
      webSocket.off("call_request_from_server", () => setOpenCallingReceivedPanel(true));
      webSocket.off("cancel_call_request_from_server", () => setOpenCallingReceivedPanel(false));
    }
  }, []);

  if (!user._id) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      className="home-cont"
      sx={{
        display: "flex",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <SideNavbar />
      <MyChat />
      {chatting._id ? <ChattingPage /> : <MessageStarter {...user} />}
      {openCallingReceivedPanel &&
        <CallingReceivedPanel
          setOpenCallingReceivedPanel={setOpenCallingReceivedPanel}
          chatroom_id={chatting._id}
          sender_id={user._id}
          currentFriend={currentFriend}
        />}
    </Box>
  );
};

const MessageStarter = ({ avatar, name }) => {
  return (
    <div className="chattingpage start-msg">
      <div>
        <Avatar
          src={avatar}
          sx={{ width: 70, height: 70 }}
        />
        <h3>Welcome, {name}</h3>
        <p>Please select a chat to start messaging.</p>
      </div>
    </div>
  );
};
