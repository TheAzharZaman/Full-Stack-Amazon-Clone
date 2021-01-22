import firebase from "firebase";

const App = firebase.initializeApp({
  apiKey: "AIzaSyAAd_-Yh8s8zawKmIASZNQpox8mhSr0AoE",
  authDomain: "clone-production.firebaseapp.com",
  projectId: "clone-production",
  storageBucket: "clone-production.appspot.com",
  messagingSenderId: "280431002123",
  appId: "1:280431002123:web:53c012e2e7d061b6a93d0e",
});

const auth = App.auth();

const db = firebase.firestore();

export { auth, db };
