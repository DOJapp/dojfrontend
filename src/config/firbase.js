// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhYUKc9pTGGZ-LpKtOZ6q-dDy_t5W9un8",
  authDomain: "namoastro-8f2e7.firebaseapp.com",
  databaseURL: "https://namoastro-8f2e7-default-rtdb.firebaseio.com",
  projectId: "namoastro-8f2e7",
  storageBucket: "namoastro-8f2e7.appspot.com",
  messagingSenderId: "1057767146446",
  appId: "1:1057767146446:web:4e81291eda71f8ad72619f",
  measurementId: "G-3Z56X2BZVK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const firestore = getFirestore(app)
const analytics = getAnalytics(app);
