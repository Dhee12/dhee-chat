// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1q3gHnSEpGKbRYSdOYyVPTBLhiJKlOsg",
    authDomain: "dhee-backend.firebaseapp.com",
    projectId: "dhee-backend",
    storageBucket: "dhee-backend.appspot.com",
    messagingSenderId: "223881319619",
    appId: "1:223881319619:web:9a7f9d6b1ce42b3467fe76",
    measurementId: "G-3NEVYYFT3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage();