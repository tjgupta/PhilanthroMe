import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

configure({ adapter: new Adapter() });

beforeAll(() => {
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "philanthrome-8bcf4.firebaseapp.com",
    databaseURL: "https://philanthrome-8bcf4.firebaseio.com",
    projectId: "philanthrome-8bcf4",
    storageBucket: "philanthrome-8bcf4.appspot.com",
    messagingSenderId: "634623017252"
  };
  firebase.initializeApp(firebaseConfig);
  const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
});
