// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-7905f.firebaseapp.com",
  projectId: "real-estate-7905f",
  storageBucket: "real-estate-7905f.appspot.com",
  messagingSenderId: "2451174947",
  appId: "1:2451174947:web:e49150a1cb05f300852396",
  measurementId: "G-GWH4WZDR76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// 3:08