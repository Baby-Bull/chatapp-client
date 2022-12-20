import "./miniComponent.scss"
import { Avatar, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import SettingsIcon from '@mui/icons-material/Settings';

export default function CallingSentPanel() {
    const [open, setOpen] = useState(true);
    return (
        <Modal
            open={open}
        // onClose={handleClose}
        >
            <Box className="panel_calling_sent" >
                <Box className="info_zone">
                    <Avatar className="avatar_user" />
                    <Typography className="username">Personal 1-112F</Typography>
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
                <div class="pulse"> <CallIcon className="icon_phone" /> </div>
                <Typography sx={{
                    color: "red",
                    fontSize: "12px"
                }}>End</Typography>
            </Box>
        </Modal>
    )
}
