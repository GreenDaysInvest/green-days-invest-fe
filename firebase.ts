import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCzRilXhMElp3dEUFaErgtjD8qjo3WoJ-U",
    authDomain: "green-days-invest-3a204.firebaseapp.com",
    projectId: "green-days-invest-3a204",
    storageBucket: "green-days-invest-3a204.appspot.com",
    messagingSenderId: "356615266296",
    appId: "1:356615266296:web:916e93d3ee867fbf20800d",
    measurementId: "G-976JHB0W7E"
}; 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export { auth, googleProvider, facebookProvider, appleProvider };
