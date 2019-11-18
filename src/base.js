import * as firebase from 'firebase';
import 'firebase/firestore';


const app = firebase.initializeApp({
  apiKey: "AIzaSyBpPA0rn91gUvFVvdsEGJdj6A93IJXiFtA",
  authDomain: "vidgyor-fee95.firebaseapp.com",
  databaseURL: "https://vidgyor-fee95.firebaseio.com",
  projectId: "vidgyor-fee95",
  storageBucket: "vidgyor-fee95.appspot.com",
  messagingSenderId: "938842856593"
});

export default app;