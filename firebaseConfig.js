import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqxFhWyDCC7ItUCU23XlVprSUa7waaQjE",
  authDomain: "task5-44bd5.firebaseapp.com",
  databaseURL: "https://task5-44bd5-default-rtdb.firebaseio.com",
  projectId: "task5-44bd5",
  storageBucket: "task5-44bd5.appspot.com",
  messagingSenderId: "659631816293",
  appId: "1:659631816293:web:71e82f4d854c21f261508c",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
