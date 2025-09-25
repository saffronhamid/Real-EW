// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRrNtczbKjjBkX352nLMV__NO05DgEJgk",
  authDomain: "real-15452.firebaseapp.com",
  projectId: "real-15452",
  storageBucket: "real-15452.firebasestorage.app",
  messagingSenderId: "449123623769",
  appId: "1:449123623769:web:5224d3f74ebf3b04bda248",
  measurementId: "G-0KG4NH1B3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();