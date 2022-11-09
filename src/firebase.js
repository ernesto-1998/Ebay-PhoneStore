import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTjenNyx2yMWg1y_e4LuDcNMJ8_7G_HTM",
  authDomain: "ebay-phonestore.firebaseapp.com",
  projectId: "ebay-phonestore",
  storageBucket: "ebay-phonestore.appspot.com",
  messagingSenderId: "278723215115",
  appId: "1:278723215115:web:cf51629465e020ef91ac0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const st = getStorage(app);
const auth = getAuth(app);

export {app, db, st, auth }

