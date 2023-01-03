import React from 'react';
import "./components.scss";
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export const MeetingComp = () => {
    return (
        <Box className='meeting_screen'>
            <Box className='buttons_top'>
                <IconButton aria-label="delete" size="large" className='button_top'>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Box>

            <Box>
                <video width="100%" height="100%" controls>
                    <source src="movie.mp4" type="video/mp4" />
                    <source src="movie.ogg" type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
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
    )
}
