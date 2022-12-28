import "./miniComponent.scss"
import { Avatar, IconButton, TextField, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box } from '@mui/system';
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ModalCustom from "../Commons/ModalCustom";
import { UploadFileToFirebase } from "../../Helpers/UploadFileToFirebase";
import { updateUserAction, uploadPic } from "../Redux/Auth/action";

export default function ProfileUserPanel({ open, setOpen }) {
    const { user } = useSelector((store) => store.user);
    const [rotateBack, setRotateBack] = useState(false);
    const uploadImageButton = useRef();
    const dispatch = useDispatch();

    const [formUpdate, setFormUpdate] = useState({
        id: user?._id,
        avatar: "",
        username: "",
        email: ""
    })

    const changeFormValue = (e) => {
        setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
    }

    const handleUploadImage = async (file) => {
        const tempUpload = await UploadFileToFirebase(file);
        if (tempUpload?.progress === 100) {
            dispatch(uploadPic(user?._id, tempUpload?.url));
            setFormUpdate({ ...formUpdate, ["avatar"]: tempUpload?.url });
        }
    }

    const handleSaveUserUpdated = async () => {
        dispatch(updateUserAction(user?._id, formUpdate));
        setRotateBack(!rotateBack)
    }


    return (
        <ModalCustom
            sx={{ outline: "none" }}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className={`outer-div ${rotateBack && 'rotateBack'}`}>
                <div className="inner-div">
                    <div className="front">
                        <div className="front__bkg-photo"></div>
                        <Avatar
                            className="face-photo"
                            alt={user?.username}
                            src={user?.avatar}
                        />
                        <div className="front__text">
                            <h3 className="front__text-header">{user?.username}</h3>
                            <p className="front__text-para">{user?.email}</p>
                            <div className="online_status">
                                <div className="online_dot" /> Online
                            </div>
                            <span
                                onClick={() => setRotateBack(!rotateBack)}
                                className="front__text-hover"
                            >Click to edit</span>
                        </div>
                    </div>
                    <div className="back front">
                        <div className="front__bkg-photo"></div>
                        <Avatar
                            className="face-photo"
                            alt={user?.username}
                            src={user?.avatar}
                        />
                        <input
                            type='file'
                            onChange={(e) => handleUploadImage(e.target.files[0])}
                            onClick={event => event.target.value = null}
                            ref={uploadImageButton}
                            style={{ display: "none" }}
                            accept="video/*,image/*"
                        />
                        <IconButton
                            className="add_image_button"
                            aria-label="delete"
                            onClick={() => uploadImageButton.current.click()}
                        >
                            <PhotoCameraIcon sx={{
                                height: "0.7em",
                                width: "0.7em"
                            }} />
                        </IconButton>
                        <div className="front__text front__text_edit">
                            <TextField
                                id="standard-basic"
                                label="Username"
                                variant="standard"
                                defaultValue={user?.username}
                                name="username"
                                value={formUpdate?.username}
                                onChange={changeFormValue}
                            />
                            <TextField
                                sx={{
                                    margin: '1em 0'
                                }}
                                id="standard-basic"
                                label="Email"
                                name="email"
                                variant="standard"
                                defaultValue={user?.email}
                                onChange={changeFormValue}
                                value={formUpdate?.email}
                            />
                            <span
                                onClick={handleSaveUserUpdated}
                                className="front__text-hover text-save"
                            >Click to save</span>
                        </div>
                        <div className="social-media-wrapper">
                            {/* <a href="#" class="social-icon"><i class="fab fa-codepen" aria-hidden="true"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-github-square" aria-hidden="true"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-linkedin-square" aria-hidden="true"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-instagram" aria-hidden="true"></i></a> */}
                        </div>
                    </div>

                </div>
            </div>
        </ModalCustom >
    )
}
