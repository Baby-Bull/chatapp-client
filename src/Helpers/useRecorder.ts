import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { UploadFileToFirebase } from './UploadFileToFirebase';

const initialStateRecord = {
    recordMinutes: 0,
    recordSeconds: 0,
    initRecording: false,
    mediaStream: null,
    mediaRecorder: null,
    audio: null || "",
};

const startRecord = async (setRecordState: any) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setRecordState((prevState: any) => {
            return {
                ...prevState,
                initRecording: true,
                mediaStream: stream,
            };
        })
    } catch (error) {
        console.log(error);
        toast.error("Recorder devices not found!")
    }
}

const saveRecord = (rec: any) => {
    if (rec.state !== "inactive") rec.stop();
}

export default function useRecorder() {
    const [recordState, setRecordState] = useState(initialStateRecord);
    const [firebaseRes, setFirebaseRes] = useState<any>({});

    useEffect(() => {
        const MAX_TIME = 5; // minutes to record
        let recordInterval: any = null;

        if (recordState.initRecording) {
            recordInterval = setInterval(() => {
                setRecordState((prevState: any) => {
                    if (prevState.recordMinutes === MAX_TIME && prevState.recordSeconds === 0) {
                        clearInterval(recordInterval);
                        return prevState;
                    }
                    else if (prevState.recordSeconds >= 0 && prevState.recordSeconds < 59) {
                        return {
                            ...prevState,
                            recordSeconds: prevState.recordSeconds + 1,
                        }
                    }
                    else if (prevState.recordSeconds === 59) {
                        return {
                            ...prevState,
                            recordMinutes: prevState.recordMinutes + 1,
                            recordSeconds: 0,
                        };
                    };
                });
            }, 1000);
        }
        else
            clearInterval(recordInterval);

        return () => clearInterval(recordInterval);
    })

    //setup new Recorder whenever have new stream from client
    useEffect(() => {
        if (recordState.mediaStream)
            setRecordState((prevState: any) => (
                {
                    ...prevState,
                    mediaRecorder: new MediaRecorder(prevState.mediaStream),
                }
            ));
    }, [recordState.mediaStream]);

    useEffect(() => {
        const recorder: any = recordState.mediaRecorder;
        let arraysData: Array<any> = [];

        if (recorder && recorder.state === "inactive") {
            recorder.start();
            recorder.ondataavailable = (e: any) => {
                arraysData.push(e.data);
            };

            recorder.onstop = async () => {
                const blob = new Blob(arraysData, { 'type': 'audio/mp3' });
                arraysData = [];
                const resUpload = await UploadFileToFirebase(blob);
                setFirebaseRes(resUpload);

                setRecordState((prevState: any) => {
                    if (prevState.mediaRecorder) {
                        return {
                            ...initialStateRecord,
                            audio: window.URL.createObjectURL(blob),
                        };
                    }
                    else {
                        return initialStateRecord;
                    }
                })
            }
        }

        return () => {
            if (recorder)
                recorder.stream.getAudioTracks().forEach(miniTrack => miniTrack.stop());
        };
    }, [recordState.mediaRecorder]);

    return {
        recorderState: recordState,
        firebaseRes: firebaseRes,
        startRecording: () => startRecord(setRecordState),
        cancelRecording: () => setRecordState(initialStateRecord),
        saveRecording: () => saveRecord(recordState.mediaRecorder),
    };
}
