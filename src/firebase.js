import { initializeApp } from 'firebase/app';
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'dashboard-4886f.firebaseapp.com',
  projectId: 'dashboard-4886f',
  storageBucket: 'dashboard-4886f.appspot.com',
  messagingSenderId: '218200412067',
  appId: '1:218200412067:web:36532b5887357513625416',
};



export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)