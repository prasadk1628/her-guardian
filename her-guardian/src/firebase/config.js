import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxt9QDO5bmg-ySpYGTQ8-csggItXEuKy0",
  authDomain: "her-guardian-12.firebaseapp.com",
  projectId: "her-guardian-12",
  storageBucket: "her-guardian-12.firebasestorage.app",
  messagingSenderId: "657204759777",
  appId: "1:657204759777:web:f041f75e4ddf010a77bba0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);