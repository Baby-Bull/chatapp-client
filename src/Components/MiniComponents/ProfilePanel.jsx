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
        >
            <Box className="panel_profile" >

            </Box>
        </Modal>
    )
}