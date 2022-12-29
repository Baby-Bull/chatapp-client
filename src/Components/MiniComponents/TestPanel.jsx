import { useState } from "react";
import axios from "axios";

let gumStream = null;
let recorder = null;
let audioContext = null;

function TestPanel() {

    const [audio, setAudio] = useState(null);

    const startRecording = () => {
        let constraints = {
            audio: true,
            video: false
        }

        audioContext = new window.AudioContext();
        console.log("sample rate: " + audioContext.sampleRate);

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function (stream) {
                console.log("initializing Recorder.js ...");

                gumStream = stream;

                let input = audioContext.createMediaStreamSource(stream);

                recorder = new window.Recorder(input, {
                    numChannels: 1
                })

                recorder.record();
                console.log("Recording started");
            }).catch(function (err) {
                console.log(err);
                //enable the record button if getUserMedia() fails
            });

    }

    const stopRecording = () => {
        console.log("stopButton clicked");

        recorder.stop(); //stop microphone access
        gumStream.getAudioTracks()[0].stop();

        recorder.exportWAV(onStop);
    }

    const onStop = (blob) => {
        console.log("uploading...");

        let data = new FormData();

        data.append('text', "this is the transcription of the audio file");
        data.append('wavfile', blob, "recording.wav");

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        console.log(data);
        setAudio(data);
        //axios.post('http://localhost:8080/asr/', data, config);
    }

    return (
        <div>
            <button onClick={startRecording} type="button">Start</button>
            <button onClick={stopRecording} type="button">Stop</button>
            {audio ??
                <audio controls src={audio} />
            }
        </div>
    );
}

export default TestPanel;