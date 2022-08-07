import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDVJQNk2AA0IYuwaXFgCwOTETClhUAkxN0",
  authDomain: "stori-challenge-9a98c.firebaseapp.com",
  projectId: "stori-challenge-9a98c",
  storageBucket: "stori-challenge-9a98c.appspot.com",
  messagingSenderId: "78845647300",
  appId: "1:78845647300:web:3b3be6d7ef7bb74cafec91"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);