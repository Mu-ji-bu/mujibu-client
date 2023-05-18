// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

// TODO:之後需要創建firebase共用帳號，並改為此帳號config
const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyDSvslrOogv5YzQ9OKjMcwjd7KU4j6-nU8',
  authDomain: 'fir-test-78a87.firebaseapp.com',
  projectId: 'fir-test-78a87',
  storageBucket: 'fir-test-78a87.appspot.com',
  messagingSenderId: '738090365839',
  appId: '1:738090365839:web:41ed34c2740dd319be11fa',
  measurementId: 'G-J83VJ6FKSN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
