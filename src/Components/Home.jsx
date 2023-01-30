import { Avatar, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { ChattingPage } from "./ChattingPage";
import { MyChat } from "./MyChat";
import CallingSentPanel from "./MiniComponents/CallingSentPanel";
import CallingReceivedPanel from "./MiniComponents/CallingReceivedPanel";
import SideNavbar from "./SideNavbar";
import webSocket from "../Utils/socket";
import Peer from "peerjs";
import { CallingPanel } from "./MiniComponents/CallingPanel";

export const HomeComp = () => {
  // console.log(process.env.REACT_APP_URL_SERVER);

  const { user, loading, error } = useSelector((store) => store.user);
  const { chatting } = useSelector((store) => store.chatting);
  const [callerInfo, setCallerInfo] = useState({});
  const [openCallingReceivedPanel, setOpenCallingReceivedPanel] = useState(false);
  const [openCallingPanel, setOpenCallingPanel] = useState(false);


  const [userPeerId, setUserPeerId] = useState('');
  const [partnerPeerId, setPartnerPeerId] = useState('');
  const partnerVideo = useRef(null);
  const userVideo = useRef(null);
  const peerInstance = useRef(null);

  // useEffect(() => {
  //   const peer = new Peer();

  //   peer.on('open', (id) => {
  //     setUserPeerId(id)
  //   });

  //   peer.on('call', (call) => {
  //     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  //     getUserMedia({ video: true, audio: true }, (mediaStream) => {
  //       userVideo.current.srcObject = mediaStream;
  //       userVideo.current.play();
  //       call.answer(mediaStream)
  //       call.on('stream', function (remoteStream) {
  //         partnerVideo.current.srcObject = remoteStream
  //         partnerVideo.current.play();
  //       });
  //     });
  //   })

  //   peerInstance.current = peer;
  // }, [])


  const handleCallRequestFromServer = async (message) => {
    setCallerInfo(message?.sender_info);
    setOpenCallingReceivedPanel(true);
  }

  useEffect(() => {
    webSocket.on("call_request_from_server", handleCallRequestFromServer);
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
      {chatting._id ?
        <ChattingPage
          userVideo={userVideo}
          partnerVideo={partnerVideo}
          peerInstance={peerInstance}
        /> :
        <MessageStarter {...user} />
      }

      {openCallingReceivedPanel &&
        <CallingReceivedPanel
          setOpenCallingReceivedPanel={setOpenCallingReceivedPanel}
          chatroom_id={chatting._id}
          sender_id={user._id}
          callerInfo={callerInfo}

          userVideo={userVideo}
          partnerVideo={partnerVideo}
          peerInstance={peerInstance}
          userPeerId={userPeerId}

          setOpenCallingPanel={setOpenCallingPanel}
        />
      }
      {openCallingPanel &&
        <CallingPanel
          userVideo={userVideo}
          partnerVideo={partnerVideo}
          setOpenCallingPanel={setOpenCallingPanel}
        />
      }
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
