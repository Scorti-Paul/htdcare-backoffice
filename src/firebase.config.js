// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3EF2au1anbF9fNbL1bbPCwaN1lpND5Os",
  authDomain: "htdcare-backoffice.firebaseapp.com",
  projectId: "htdcare-backoffice",
  storageBucket: "htdcare-backoffice.appspot.com",
  messagingSenderId: "753314009907",
  appId: "1:753314009907:web:2f72e2226e5095c65e2446"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;
