// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCy-r45koSORPlZdB9o_bOwMVAGANCtnwU",
    authDomain: "mockproject-8a6f6.firebaseapp.com",
    projectId: "mockproject-8a6f6",
    storageBucket: "mockproject-8a6f6.appspot.com",
    messagingSenderId: "195828188248",
    appId: "1:195828188248:web:2799c831e2f5d55f60362d",
    measurementId: "G-4QSB9KEFQP"
};

// Initialize Firebase
//const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
