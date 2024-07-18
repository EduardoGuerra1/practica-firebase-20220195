import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCK0HElEWXRUDGbgpB3UOrPhEPm4DNdV7M",
    authDomain: "practica-firebase-20220195.firebaseapp.com",
    projectId: "practica-firebase-20220195",
    storageBucket: "practica-firebase-20220195.appspot.com",
    messagingSenderId: "1065472179010",
    appId: "1:1065472179010:web:80de4ede1ac6438176a6db",
    
};

console.log("Valor de configuracion", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app) {
    console.log('Firebase initialized successfully');
} else {
    console.log('Firebase initialization failed');
}

const database = getFirestore(app);
if (database) {
    console.log('Firestore initialized correctly');
} else {
    console.log('Firestore initialization failed');
}

const storage = getStorage(app);

if (storage) {
    console.log('storage initialized correctly');
} else {
    console.log('storage initialization failed');
}

// Obtén referencias a los servicios que necesitas
const auth = getAuth(app);

export { auth, database, storage };