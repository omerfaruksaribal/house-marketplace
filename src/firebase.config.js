// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVmZ3V61zC_BK-unz8FlDbNmP9JziB1Dw",
  authDomain: "house-marketplace-app-f4ab9.firebaseapp.com",
  projectId: "house-marketplace-app-f4ab9",
  storageBucket: "house-marketplace-app-f4ab9.appspot.com",
  messagingSenderId: "457404158617",
  appId: "1:457404158617:web:e1d3fda249141068639e08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
