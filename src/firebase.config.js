// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwDtZFVzDEJ6aChwmZT8-DQmeJVe6A378",
  authDomain: "upraised-ca971.firebaseapp.com",
  projectId: "upraised-ca971",
  storageBucket: "upraised-ca971.appspot.com",
  messagingSenderId: "705258526953",
  appId: "1:705258526953:web:893e19200e5e829996f878",
  measurementId: "G-8CSH6EHK1H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);