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



function saveNewMarker() {
    // Call uploadImg as a Promise and wait for the result
    this.uploadImg()
        .then((imgURL) => {
            console.log('Image upload finished! Pushing new marker to db');

            db.collection(this.user.email).add({
                position: this.newMarker.position,
                type: this.newMarker.type,
                location: this.newMarker.location,
                imgURL: this.newMarker.imgURL
            })
                .then((marker) => {
                    console.log('marker added to database');
                    this.newMarker.id = marker.id;
                })
        }).catch((error) => {
        //Do something
        });
};

function uploadImg() {
    // Return a promise that will either resolve or emit an error
    return new Promise((resolve, reject) => {
        console.log('Uploading image ...');
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child('user-uploads/images/' + this.file.name).put(this.name);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
                // An error occurred so inform the caller
                reject(error);
            },
            async () => {
                const imgURL = await uploadTask.snapshot.ref.getDownloadURL();
                console.log('uploaded image: ' + imgURL);
                this.newMarker.imgURL = imgURL;

                // We 'awaited' the imgURL, now resolve this Promise
                resolve(imgURL);
            }
        );
    });
};