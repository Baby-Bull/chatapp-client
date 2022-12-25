import "./miniComponent.scss"
import { Avatar, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from "react-redux";

export default function ProfileUserPanel({ open, setOpen }) {
    const { user } = useSelector((store) => store.user);
    const [rotateBack, setRotateBack] = useState(false);
    return (
        <Modal
            sx={{ outline: "none" }}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className={`outer-div ${rotateBack && 'rotateBack'}`}>
                <div className="inner-div">
                    <div className="front">
                        <div className="front__bkg-photo"></div>
                        <div className="front__face-photo"></div>
                        <div className="front__text">
                            <h3 className="front__text-header">{user?.username}</h3>
                            <p className="front__text-para"><i className="fas fa-map-marker-alt front-icons"></i>{user?.email}</p>
                            <span
                                onClick={() => setRotateBack(!rotateBack)}
                                className="front__text-hover"
                            >Click to edit</span>
                        </div>
                    </div>
                    <div className="back front">
                        <div className="front__bkg-photo"></div>
                        <div className="front__face-photo"></div>
                        <div className="front__text">
                            <h3 className="front__text-header">Bobby Korec</h3>
                            <p className="front__text-para"><i className="fas fa-map-marker-alt front-icons"></i>Seattle</p>
                            <span
                                onClick={() => setRotateBack(!rotateBack)}
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
        </Modal >
    )
}
