importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyApgn-mWcrgJPds1PwHXaIFRfQ0s_uRVlg",
  authDomain: "caselapp-b768c.firebaseapp.com",
  projectId: "caselapp-b768c",
  storageBucket: "caselapp-b768c.appspot.com",
  messagingSenderId: "70412406098",
  appId: "1:70412406098:web:af6689a0e4ad8004c53e8b",
  measurementId: "G-N4K7ERCXT4"
});

const messaging = firebase.messaging();
