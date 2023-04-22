// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPU9JF87zZKcnUJ3coZiP1ZQLoS6tkEtM",
  authDomain: "vinflat-48ce3.firebaseapp.com",
  projectId: "vinflat-48ce3",
  storageBucket: "vinflat-48ce3.appspot.com",
  messagingSenderId: "703915522841",
  appId: "1:703915522841:web:2b9db55421d203d78fa388",
  measurementId: "G-E2F5JCV1B8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);