import React, { useEffect, useRef, useState } from 'react';
import "./components.scss";
import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import "../Utils/init";

export const MeetingComp = () => {


    const [streamCalling, setStreamCalling] = useState(null);
    const [muteAudio, setMuteAudio] = useState(false);
    const [muteVideo, setMuteVideo] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();


    const peer = new Peer({
        initiator: true,
        trickle: true,
        stream: streamCalling,
    })




    const callUser = (id) => {
        setLoading(true);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        connectionRef.current = peer;
    };



    // useEffect(() => {
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: true,
    //         stream: streamCalling,
    //     })
    //     // peer.on("signal", (data) => {

    //     // });

    //     // peer.on("stream", (streamCurrent) => {
    //     //     userVideo.current.srcObject = streamCurrent;
    //     // });
    // }, [])




    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStreamCalling(currentStream);
                myVideo.current.srcObject = currentStream;
            });
    }, []);


    const muteUnmute = () => {
        const enable = streamCalling.getVideoTracks()[0].enabled;
        if (enable) {
            streamCalling.getVideoTracks()[0].enabled = false;
        }
    }


    return (
        <Box className='meeting_screen'>
            <Box className='buttons_top'>
                <IconButton aria-label="delete" size="large" className='button_top'>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </Box>

            <Box>
                {/* {stream && (
                    <video
                        playsInline
                        ref={myVideo}
                        muted
                        autoPlay
                    />)} */}
                <video
                    playsInline
                    ref={userVideo}
                    autoPlay
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
    )
}
