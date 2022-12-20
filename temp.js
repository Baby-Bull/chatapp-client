navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    var ws, mediaRecorder;
    var options = {
        mimeType: "video/webm;codecs=opus, vp8",
        bitsPerSecond: 5000 //quality
    };

    function handleVideo() {

        try {
            mediaRecorder.stop()
        } catch (e) { }
        mediaRecorder = null;
        mediaRecorder = new MediaRecorder(stream, options);
        mediaRecorder.ondataavailable = function (e) {

            if (e.data && e.data.size > 0) {
                e.data.arrayBuffer().then(buffer => {
                    ws.send(buffer)
                })
            }
        }
        mediaRecorder.start(300);
    }

    function connect() {
        ws = new WebSocket("wss://yourwebsocket.com")
        ws.binaryType = "arraybuffer"
        ws.onopen = handleVideo
        ws.onmessage = handleVideo
        ws.onclose = connect
    }
    connect()
})