import "./miniComponent.scss"
import React, { useEffect, useRef, useState } from "react"
import { AttachFile } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import { Box, LinearProgress, Menu, MenuItem } from "@mui/material";

export const FileUpload = ({
    setContent_type,
    setSelectedFile,
    selectedFile,
    progress
}) => {

    const [preview, setPreview] = useState();
    const uploadImageButton = useRef();
    const uploadFileButton = useRef();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };
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
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf"
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
                    onClick={(e) => handleClick(e)}
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
                        <RecordVoiceOverIcon />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <AudioFileIcon />
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
        </div>
    )
}