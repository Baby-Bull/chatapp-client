import React, { useEffect, useRef, useState } from 'react';
import "./miniComponent.scss";
import { Box, IconButton, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export const CallingPanel = ({ userVideo, partnerVideo }) => {

    return (
        <Modal
            open={true}
        >
            <Box className='meeting_screen'>
                <Box className='buttons_top'>
                    <IconButton aria-label="delete" size="large" className='button_top'>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Box>

                <Box sx={{
                    width: "100%",
                    height: "100%"
                }}>
                    <video
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                        controls
                        playsInline
                        ref={partnerVideo}
                        autoPlay
                        muted
                    />
                    <video
                        style={{
                            width: "30vw",
                            position: "absolute",
                            bottom: "5vh",
                            right: "2vw",
                            zIndex: "2"
                        }}
                        controls
                        playsInline
                        ref={userVideo}
                        autoPlay
                        muted
                    />
                </Box>
                <Box className='controller_block'>
                    <IconButton size="large" className='button_controller'>
                        <ScreenShareIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" className='button_controller'>
                        <GroupAddIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" className='button_controller'>
                        <VideocamOffIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" className='button_controller'>
                        <KeyboardVoiceIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton size="large" className='button_controller'>
                        <CallEndIcon fontSize="inherit" />
                    </IconButton>
                </Box>
            </Box>
        </Modal>
    )
}
