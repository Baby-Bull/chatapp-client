import "./miniComponent.scss"
import { Avatar, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import SettingsIcon from '@mui/icons-material/Settings';
import ModalCustom from "../Commons/ModalCustom";

export default function CallingSentPanel() {
    const [open, setOpen] = useState(true);
    return (
        <ModalCustom
            open={open}
        >
            <Box className="panel_border panel_profile" >

            </Box>
        </ModalCustom>
    )
}