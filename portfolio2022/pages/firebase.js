 import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAwuwYFgDWEsEZZQTRj_y-EcEaD3nOlofg",
    authDomain: "whatsapp-2-f5456.firebaseapp.com",
    projectId: "whatsapp-2-f5456",
    storageBucket: "whatsapp-2-f5456.appspot.com",
    messagingSenderId: "461582413939",
    appId: "1:461582413939:web:09336950083f20d260fa06"
};

// Use this to initialize the firebase App
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

// Use these for db & auth
 const db = app.firestore();
 const auth = app.auth();
 const provider = new firebase.auth.GoogleAuthProvider();
export  { auth, db, provider };