// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCU4ZLqYmpCK5ZniTPMo0QrwiAVgFsUqIg",
  authDomain: "healthfit-1549c.firebaseapp.com",
  databaseURL: "https://healthfit-1549c-default-rtdb.firebaseio.com",
  projectId: "healthfit-1549c",
  storageBucket: "healthfit-1549c.firebasestorage.app",
  messagingSenderId: "198110380646",
  appId: "1:198110380646:web:40f770ec39db6c156da3a7",
  measurementId: "G-1KFEJJ9X5C"
};

// Inicializa o Firebase somente se ele ainda não foi inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

export default firebase;
