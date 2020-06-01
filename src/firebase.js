import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCpdDT0NOxLFXxlRz-AFva1yWwFaPaV0YY",
  authDomain: "bet-money-b8d2c.firebaseapp.com",
  databaseURL: "https://bet-money-b8d2c.firebaseio.com",
  projectId: "bet-money-b8d2c",
  storageBucket: "bet-money-b8d2c.appspot.com",
  messagingSenderId: "548568890503",
  appId: "1:548568890503:web:95bc2c2c222b0494be0c22",
  measurementId: "G-C1YGF1M324",
};
// Initialize Firebase
// firebase.analytics();
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
