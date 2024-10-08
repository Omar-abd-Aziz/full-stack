const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDPxEqszGqqJIDP021Tf30FImqxrmla2gw",
  authDomain: "alkaffaa-2f1c5.firebaseapp.com",
  projectId: "alkaffaa-2f1c5",
  storageBucket: "alkaffaa-2f1c5.appspot.com",
  messagingSenderId: "817611613726",
  appId: "1:817611613726:web:fe91072ac7d0b0026df00f",
  measurementId: "G-B2N4L3TVR3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db;
