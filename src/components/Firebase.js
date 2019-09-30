import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import auth from 'firebase/auth'
import 'firebase/storage';



const settings = {timestampsInSnapshots: true};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4G0Ce9SdmxnbO2gZ-IinhI3KTJGmq378",
  authDomain: "envy-hxxdini.firebaseapp.com",
  databaseURL: "https://envy-hxxdini.firebaseio.com",
  projectId: "envy-hxxdini",
  storageBucket: "envy-hxxdini.appspot.com",
  messagingSenderId: "605079912847",
  appId: "1:605079912847:web:a04ba20de1822968"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings(settings);

export default firebase;
