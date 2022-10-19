import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAU4EChi3H59N-U5wwU9cHUpHiDCnfwvM4',
    authDomain: 'chat-a43fe.firebaseapp.com',
    projectId: 'chat-a43fe',
    storageBucket: 'chat-a43fe.appspot.com',
    messagingSenderId: '1019658006919',
    appId: '1:1019658006919:web:619b7382ece0634ec06322',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
