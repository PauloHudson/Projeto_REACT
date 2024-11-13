// Importação da API modular do Firebase (Firebase 9 ou superior)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  



const firebaseConfig = {
  apiKey: "AIzaSyCU4ZLqYmpCK5ZniTPMo0QrwiAVgFsUqIg",
  authDomain: "healthfit-1549c.firebaseapp.com",
  databaseURL: "https://healthfit-1549c-default-rtdb.firebaseio.com",
  projectId: "healthfit-1549c",
  storageBucket: "healthfit-1549c.appspot.com",
  messagingSenderId: "198110380646",
  appId: "1:198110380646:web:40f770ec39db6c156da3a7",
  measurementId: "G-1KFEJJ9X5C"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


export { auth };
