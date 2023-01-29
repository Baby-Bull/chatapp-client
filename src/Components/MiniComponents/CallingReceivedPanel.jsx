import "./miniComponent.scss"
import { Avatar, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import webSocket from "../../Utils/socket"
import dayjs from "dayjs";
import Peer from "simple-peer";
import { CallingPanel } from "./CallingPanel";


export default function CallingReceivedPanel({
    setOpenCallingReceivedPanel,
    chatroom_id,
    sender_id,
    callerInfo,
    userVideo,
    partnerVideo
}) {

    const handleRejectCallingRequest = () => {
        setOpenCallingReceivedPanel(false);
        webSocket.emit({
            message_type: "reject_calling_request_from_client",
            chatroom_id: chatroom_id,
            sender_id: sender_id,
            createdAt: dayjs().format()
        });
    }

    const handleAcceptCallingRequest = () => {
        setOpenCallingReceivedPanel(false);

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", data => {

        })

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        })

        webSocket.emit({
            message_type: "accept_calling_request_from_client",
            chatroom_id: chatroom_id,
            sender_id: sender_id,
            createdAt: dayjs().format()
        });
    }

    return (
        <>
            <Modal
                open={true}
            >
                <Box className="panel_border panel_calling_sent" >
                    <Box className="info_zone">
                        <Avatar className="avatar_user" src={callerInfo?.avatar} />
                        <Typography className="username">{callerInfo?.username}</Typography>
                    </Box>
                    <div className="response_zone"
                        style={{ display: "flex" }}
                    >
                        <div className="opt_reject"
                            onClick={handleRejectCallingRequest}
                        >
                            <div className="pulse"> <PhoneDisabledIcon className="icon_phone" /> </div>
                            <Typography sx={{
                                color: "red",
                                fontSize: "12px"
                            }}>End</Typography>
                        </div>
                        <div className="opt_accept"
                            onClick={handleAcceptCallingRequest}
                            style={{ marginLeft: "6em" }}
                        >
                            <div className="pulse pulse_accept"> <CallIcon className="icon_phone" /> </div>
                            <Typography sx={{
                                color: "#05a805",
                                fontSize: "12px"
                            }}>Accept</Typography>
                        </div>
                    </div>

                </Box>
            </Modal>
            <CallingPanel
                userVideo={userVideo}
                partnerVideo={partnerVideo}
            />
        </>
    )
}
