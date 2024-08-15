// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0gPh0RbO2uaiGFb2tlv9qo5d6nG1t9a0",
  authDomain: "farmercom-vendor.firebaseapp.com",
  projectId: "farmercom-vendor",
  storageBucket: "farmercom-vendor.appspot.com",
  messagingSenderId: "250247286832",
  appId: "1:250247286832:web:accb48179ec5c218c3ddf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
