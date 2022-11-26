import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARcE_0vwSmcRn87tt7lKjrIeP8ExISS1s",
  authDomain: "miniblog-50590.firebaseapp.com",
  projectId: "miniblog-50590",
  storageBucket: "miniblog-50590.appspot.com",
  messagingSenderId: "1053377837148",
  appId: "1:1053377837148:web:1c5d9dcfe5d348252f4e99"
};

// Initialize firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
