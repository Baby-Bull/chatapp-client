import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Utils/firebase";

export async function UploadFileToFirebase(reqFile) {
    let progress = 0;
    let url = "";

    const uploadImage = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) return;
            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const prog = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    progress = prog
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            url = downloadURL;
                            resolve(downloadURL);
                        })
                }
            )
        })
    }
    await uploadImage(reqFile);

    return {
        progress,
        url
    }
}