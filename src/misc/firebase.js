import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
        apiKey: "AIzaSyDsLpYFiYmEGkwsYrg4ThpUfOcBzkcjIUY",
        authDomain: "chat-web-app-7d818.firebaseapp.com",
        databaseURL: "https://chat-web-app-7d818-default-rtdb.firebaseio.com",
        projectId: "chat-web-app-7d818",
        storageBucket: "chat-web-app-7d818.appspot.com",
        messagingSenderId: "12777284032",
        appId: "1:12777284032:web:a8c15760c096e6a6366825"
};


const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();