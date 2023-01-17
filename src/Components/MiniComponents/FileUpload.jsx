import "./miniComponent.scss"
import React, { useEffect, useRef, useState } from "react"
import { AttachFile } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { Box, LinearProgress, Menu, MenuItem } from "@mui/material";
import RecorderPanel from "./RecorderPanel";

export const FileUpload = ({
    setContent_type,
    setSelectedFile,
    selectedFile,
    progress,
    handleSendRecordMessage
}) => {

    const [openRecordPanel, setOpenRecordPanel] = useState(false)

    const [preview, setPreview] = useState();
    const uploadImageButton = useRef();
    const uploadFileButton = useRef();
    const uploadAudioButton = useRef();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


    const onSelectItem = (mode) => (e) => {
        if (!e || !e?.target.files || e?.target.files.length === 0) {
            setSelectedFile(undefined);
            setContent_type(undefined);
            return;
        }
        switch (mode) {
            case "image":
                setContent_type("image");
                break;
            case "file":
                setContent_type("file");
                break;
            case "audio":
                setContent_type("audio");
                break;
            default:
                setContent_type("text")
                break;
        }
        setSelectedFile(e.target.files[0]);
    }
    // const onSelectFile = e => {
    //     if (!e || !e?.target.files || e?.target.files.length === 0) {
    //         setSelectedFile(undefined);
    //         setContent_type(undefined);
    //         return;
    //     }
    //     setContent_type("file");
    //     setSelectedFile(e.target.files[0])
    // }


    return (
        <div>
            <input
                type='file'
                onChange={onSelectItem("image")}
                onClick={event => event.target.value = null}
                ref={uploadImageButton}
                style={{ display: "none" }}
                accept="video/*,image/*"
            />
            <input
                type='file'
                onChange={onSelectItem("file")}
                onClick={event => event.target.value = null}
                ref={uploadFileButton}
                style={{ display: "none" }}
                accept=".xlsx, .xls, .doc, .docx,.ppt, .pptx,.txt,.pdf"
            />
            <input
                type='file'
                onChange={onSelectItem("audio")}
                onClick={event => event.target.value = null}
                ref={uploadAudioButton}
                style={{ display: "none" }}
                accept="audio/*"
            />
            <Box className="media_message_buttons">
                <AddPhotoAlternateIcon
                    className="icon_mui"
                    onClick={() => uploadImageButton.current.click()}
                />
                <AttachFile
                    sx={{ margin: "0 0.3em" }}
                    onClick={() => uploadFileButton.current.click()}
                />
                <KeyboardVoiceIcon
                    onClick={(e) => setAnchorEl(e?.currentTarget)}
                />
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <RecordVoiceOverIcon
                            onClick={() => setOpenRecordPanel(true)}
                        />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <AudioFileIcon onClick={() => uploadAudioButton.current.click()} />
                    </MenuItem>
                </Menu>
            </Box>
            {selectedFile &&
                <div className="preview_zone">
                    <img
                        className="preview_image"
                        src={preview}
                    />
                    <LinearProgress
                        className="progress_bar"
                        variant="determinate" value={progress} />
                    <CloseIcon
                        onClick={() => setSelectedFile(undefined)}
                        className="preview_close"
                    />
                </div>
            }
            <RecorderPanel
                openRecordPanel={openRecordPanel}
                setOpenRecordPanel={setOpenRecordPanel}
                onSelectItem={onSelectItem}
                handleSendRecordMessage={handleSendRecordMessage}
            />
        </div>
    )
}