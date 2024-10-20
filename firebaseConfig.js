// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMMJEeKPIeAYKBsdMiJXz4NczbN7HLoOk",
    authDomain: "fir-demo-150d3.firebaseapp.com",
    databaseURL: "https://fir-demo-150d3-default-rtdb.firebaseio.com",
    projectId: "fir-demo-150d3",
    storageBucket: "fir-demo-150d3.appspot.com",
    messagingSenderId: "842728504266",
    appId: "1:842728504266:web:27cedc068a075327e12d33"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);