import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0btyJdj0fWPq1T2m3qckrSHBuNoK5yq8",
  authDomain: "ica04-3f369.firebaseapp.com",
  projectId: "ica04-3f369",
  storageBucket: "ica04-3f369.firebasestorage.app",
  messagingSenderId: "314270899858",
  appId: "1:314270899858:web:9ff1eb1c3285f823f1904b"
};


export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);


export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
