import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyB0AQpihKYzkdP_QNAAOsaS2ovazPwc30k',
  authDomain: 'ask-me-anything-66fe2.firebaseapp.com',
  databaseURL: 'https://ask-me-anything-66fe2.firebaseio.com',
  projectId: 'ask-me-anything-66fe2',
  storageBucket: 'ask-me-anything-66fe2.appspot.com',
  messagingSenderId: '155329472713',
});

app.firestore().settings({ timestampsInSnapshots: true });

export default {
  auth: app.auth(),
  db: app.firestore(),
};
