import "./miniComponent.scss"
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import ModalCustom from "../Commons/ModalCustom";
import MicIcon from '@mui/icons-material/Mic';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from "@mui/material/CircularProgress";
import { formatMinutes, formatSeconds } from "../../Helpers/HelperFunctions";
import useRecorder from "../../Helpers/useRecorder";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";

export default function RecorderPanel({
    setOpenRecordPanel,
    onSelectItem,
    handleSendRecordMessage
}) {

    const { recorderState, firebaseRes, ...handlers } = useRecorder();
    const { recordMinutes, recordSeconds, initRecording } = recorderState;
    const { startRecording, saveRecording, cancelRecording } = handlers;

    const [loadingSendRecordMessage, setLoadingSendRecordMessage] = useState(false)

    const handleRecord = async () => {
        onSelectItem("audio");
        await startRecording();
        // !initRecording && toast.error("Browser not support microphone")
    }

    console.log(firebaseRes);

    const handlerSendRecord = async () => {
        setLoadingSendRecordMessage(true);
        saveRecording();
        // if (firebaseRes?.profress === 100) {
        //     console.log(firebaseRes?.url);
        //     firebaseRes?.url && handleSendRecordMessage(firebaseRes?.url);
        //     setOpenRecordPanel(false);
        //     setLoadingSendRecordMessage(false);
        // }
    }

    useEffect(() => {
        if (firebaseRes?.progress === 100) {
            console.log(firebaseRes?.url);
            firebaseRes?.url && handleSendRecordMessage(firebaseRes?.url);
            setOpenRecordPanel(false);
            setLoadingSendRecordMessage(false);
        }
    }, [firebaseRes?.url])


    return (
        <ModalCustom
            open={true}
            className="panel_record"
            onClose={() => setOpenRecordPanel(false)}
        >
            <Box className="panel_border panel_record_content" >
                <div className="button_trigger_zone">
                    <IconButton
                        className={initRecording ? "button_trigger_on_phone" : "button_trigger_off_phone"}
                        onClick={handleRecord}
                    >
                        <MicIcon className="icon_phone" />
                    </IconButton>
                    <span style={{ fontSize: "0.7em", fontWeight: "700" }}>{!initRecording && "Press to record"}</span>
                </div>
                <div className="controls-container">
                    <div className="recorder-display">
                        <div className="recording-time">
                            <span>{formatMinutes(recordMinutes)}</span>
                            <span>:</span>
                            <span>{formatSeconds(recordSeconds)}</span>
                        </div>
                        <div className="button_controll_record">
                            {initRecording && (
                                <IconButton
                                    className="cancel-button button_recorder"
                                    title="Cancel recording"
                                    onClick={cancelRecording}
                                >
                                    <ClearIcon />
                                </IconButton>
                            )}
                            {initRecording && (
                                loadingSendRecordMessage ?
                                    <IconButton
                                        disabled
                                        className="start-button button_recorder"
                                    >
                                        <CircularProgress size="1rem" style={{ color: "gray" }} />
                                    </IconButton>
                                    :
                                    <IconButton
                                        className="start-button button_recorder"
                                        title="Save recording"
                                        disabled={recordSeconds === 0}
                                        onClick={handlerSendRecord}
                                    >
                                        <SendIcon />
                                    </IconButton>
                            )}
                        </div>
                    </div>
                </div>
            </Box>
        </ModalCustom>
    )
}