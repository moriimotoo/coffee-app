// database/firebaseDb.js

import firebase from 'firebase/compat/app';
import firestore from 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBs0bb-TdEiPFumz5NtqRsEQdhCvDOLXXc",
  authDomain: "appyuh.firebaseapp.com",
  databaseURL: "https://appyuh-default-rtdb.firebaseio.com",
  projectId: "appyuh",
  storageBucket: "appyuh.appspot.com",
  messagingSenderId: "435257846988",
  appId: "1:435257846988:web:cb74e4d3eaa4d2942fa669"
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;