import "./miniComponent.scss"
import { Avatar, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import SettingsIcon from '@mui/icons-material/Settings';
import webSocket from "../../Utils/socket"
import dayjs from "dayjs";

export default function CallingSentPanel({ setOpenCallingSentPanel, chatroom_id, sender_id, currentFriend }) {

    const handleCancelCallRequest = () => {
        setOpenCallingSentPanel(false);
        webSocket.emit({
            message_type: "cancel_calling_request_from_client",
            chatroom_id: chatroom_id,
            sender_id: sender_id,
            createdAt: dayjs().format()
        });
    }

    return (
        <Modal
            open={true}
        // onClose={handleClose}
        >
            <Box className="panel_calling_sent" >
                <Box className="info_zone">
                    <Avatar className="avatar_user" src={currentFriend?.avatar} />
                    <Typography className="username">{currentFriend?.username}</Typography>
                </Box>
                <Box className="controller_zone">
                    <div className="cotroller_item">
                        <div className="cotroller_button">
                            <KeyboardVoiceIcon className="controller_icon" />
                        </div>
                        <Typography className="controller_label">Voice</Typography>
                    </div>
                    <div className="cotroller_item">
                        <div
                            className="cotroller_button"
                            style={{ margin: "0 2em" }}
                        >
                            <VideocamOffIcon className="controller_icon" />
                        </div>
                        <Typography className="controller_label">Camera</Typography>
                    </div>
                    <div className="cotroller_item">
                        <div className="cotroller_button">
                            <SettingsIcon className="controller_icon" />
                        </div>
                        <Typography className="controller_label">Setting</Typography>
                    </div>
                </Box>
                <div className="pulse" onClick={handleCancelCallRequest}> <CallIcon className="icon_phone" /> </div>
                <Typography sx={{
                    color: "red",
                    fontSize: "12px"
                }}
                >End</Typography>
            </Box>
        </Modal>
    )
}
