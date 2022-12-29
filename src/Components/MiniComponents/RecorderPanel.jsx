import "./miniComponent.scss"
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import ModalCustom from "../Commons/ModalCustom";
import MicIcon from '@mui/icons-material/Mic';
import ClearIcon from '@mui/icons-material/Clear';
import SendIcon from '@mui/icons-material/Send';
import { formatMinutes, formatSeconds } from "../../Helpers/HelperFunctions";
import useRecorder from "../../Helpers/useRecorder";
import { IconButton } from "@mui/material";

export default function RecorderPanel({ openRecordPanel, setOpenRecordPanel }) {

    const { recorderState, firebaseRes, ...handlers } = useRecorder();
    const { recordMinutes, recordSeconds, initRecording } = recorderState;
    const { startRecording, saveRecording, cancelRecording } = handlers;


    const [statusRecord, setStatusRecord] = useState(false);


    console.log(firebaseRes);

    const handleRecord = () => {
        statusRecord && startRecording();
        startRecording() && setStatusRecord(!statusRecord);
    }

    return (
        <ModalCustom
            open={openRecordPanel}
            className="panel_record"
            onClose={() => {
                setOpenRecordPanel(false);
                setStatusRecord(false)
            }}
        >
            <Box className="panel_border panel_record_content" >
                <div className="button_trigger_zone">
                    <IconButton
                        className={statusRecord ? "button_trigger_on_phone" : "button_trigger_off_phone"}
                        onClick={handleRecord}
                    >
                        <MicIcon className="icon_phone" />
                    </IconButton>
                    <span style={{ fontSize: "0.7em", fontWeight: "700" }}>{statusRecord && "Press to record"}</span>
                </div>
                <div className="controls-container">
                    <div className="recorder-display">
                        <div className="recording-time">
                            <span>{formatMinutes(recordMinutes)}</span>
                            <span>:</span>
                            <span>{formatSeconds(recordSeconds)}</span>
                        </div>
                        {initRecording && (
                            <div className="cancel-button-container">
                                <IconButton
                                    lassName="cancel-button"
                                    title="Cancel recording"
                                    onClick={cancelRecording}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </div>
                        )}
                    </div>
                    <div className="start-button-container">
                        {initRecording ? (
                            <IconButton
                                className="start-button"
                                title="Save recording"
                                disabled={recordSeconds === 0}
                                onClick={async () => {
                                    await saveRecording();
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        ) : (
                            <button
                                className="start-button"
                                title="Start recording"
                            //onClick={startRecording}
                            >
                                start
                            </button>
                        )}
                    </div>
                </div>
            </Box>
        </ModalCustom>
    )
}