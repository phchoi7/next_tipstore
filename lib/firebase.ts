import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA4iu7T4PajESJLIbxobPGYCVp9qhPWipg',
  authDomain: 'tipstore-18610.firebaseapp.com',
  projectId: 'tipstore-18610',
  storageBucket: 'tipstore-18610.appspot.com',
  messagingSenderId: '224035807098',
  appId: '1:224035807098:web:79247cd358c01d4d0840c3',
  measurementId: 'G-W72QTYE0WM',
};

export const fire = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
