import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD0BfBv3WjBBs6oBIzIAVckrkRzP0v_dqg",
  authDomain: "signal-clone-dhruv.firebaseapp.com",
  projectId: "signal-clone-dhruv",
  storageBucket: "signal-clone-dhruv.appspot.com",
  messagingSenderId: "15636789141",
  appId: "1:15636789141:web:fd7ad6f373691b3ce0289c"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };