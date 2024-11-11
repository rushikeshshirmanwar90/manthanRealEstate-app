import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm6YFFAfysgxk8uTER_OUaXtJ3BjjPWbA",
  authDomain: "application-a1c23.firebaseapp.com",
  projectId: "application-a1c23",
  storageBucket: "application-a1c23.appspot.com",
  messagingSenderId: "920859481203",
  appId: "1:920859481203:web:9bdae5526204e1dfde0606",
  measurementId: "G-9RLLHD6EE8",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
