import "./miniComponent.scss"
import { Avatar, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CallIcon from '@mui/icons-material/Call';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';


export default function CallingReceivedPanel() {
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
                <div className="response_zone"
                    style={{ display: "flex" }}
                >
                    <div className="opt_reject">
                        <div class="pulse"> <PhoneDisabledIcon className="icon_phone" /> </div>
                        <Typography sx={{
                            color: "red",
                            fontSize: "12px"
                        }}>End</Typography>
                    </div>
                    <div className="opt_accept"
                        style={{ marginLeft: "6em" }}>
                        <div class="pulse pulse_accept"> <CallIcon className="icon_phone" /> </div>
                        <Typography sx={{
                            color: "#05a805",
                            fontSize: "12px"
                        }}>Accept</Typography>
                    </div>
                </div>

            </Box>
        </Modal>
    )
}
