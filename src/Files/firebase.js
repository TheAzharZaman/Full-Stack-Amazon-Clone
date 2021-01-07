import firebase from "firebase";

const App = firebase.initializeApp({
  apiKey: "AIzaSyBU72BXAeMh112B5p6wn4fju7LhQ5rk5Ts",
  authDomain: "clone-develop.firebaseapp.com",
  projectId: "clone-develop",
  storageBucket: "clone-develop.appspot.com",
  messagingSenderId: "252468902483",
  appId: "1:252468902483:web:84c25d4da14556b5a224a6",
});

const auth = App.auth();

const db = firebase.firestore();

export { auth, db };
