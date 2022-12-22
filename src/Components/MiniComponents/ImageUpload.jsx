import "./miniComponent.scss"
import { useEffect, useRef, useState } from "react"
import { AttachFile } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { Box, LinearProgress } from "@mui/material";

export const ImageUpload = ({
    setContent_type,
    setSelectedFile,
    selectedFile,
    progress
}) => {

    const [preview, setPreview] = useState();
    const uploadButton = useRef();

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


    const onSelectFile = e => {
        if (!e || !e?.target.files || e?.target.files.length === 0) {
            setSelectedFile(undefined);
            setContent_type(undefined);
            return;
        }
        setContent_type("file");
        setSelectedFile(e.target.files[0])
    }


    return (
        <div>
            <input
                type='file'
                onChange={onSelectFile}
                onClick={event => event.target.value = null}
                ref={uploadButton}
                style={{ display: "none" }}
            />
            <AttachFile onClick={() => uploadButton.current.click()} />
            {selectedFile &&
                <div className="preview_zone">
                    <img
                        className="preview_image"
                        src={preview}
                    />
                    <LinearProgress
                        sx={{

                        }}
                        className="progress_bar"
                        variant="determinate" value={progress} />
                    <CloseIcon
                        onClick={() => onSelectFile(undefined)}
                        className="preview_close"
                    />
                </div>
            }
        </div>
    )
}