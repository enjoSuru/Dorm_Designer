import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAr1YexdffgH40uM9FSKaYGJcfhF7shBaE",
  authDomain: "aidentestsite-af39d.firebaseapp.com",
  projectId: "aidentestsite-af39d",
  storageBucket: "aidentestsite-af39d.appspot.com",
  messagingSenderId: "41063932112",
  appId: "1:41063932112:web:5ed2cb8ffffe70d6c5bed5",
  measurementId: "G-V04YGXTB0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

