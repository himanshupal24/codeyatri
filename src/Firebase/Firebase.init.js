// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
   apiKey: "AIzaSyAN5UkPleLbUfN3EWdlpSAGXvHwR0nuLOY",
   authDomain: "code-yatri.firebaseapp.com",
   projectId: "code-yatri",
   storageBucket: "code-yatri.firebasestorage.app",
   messagingSenderId: "218949470232",
   appId: "1:218949470232:web:b7cef4525194160cbd1b6d",
   measurementId: "G-H7MBE92YL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore instance

// ✅ Use named exports, NOT default
export {app,auth,db };
