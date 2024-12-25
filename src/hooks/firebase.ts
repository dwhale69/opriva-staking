import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAptBvUtEqAQnytMuZraAI5YyAf_r4CxRA",
  authDomain: "opriva-67aba.firebaseapp.com",
  projectId: "opriva-67aba",
  storageBucket: "opriva-67aba.firebasestorage.app",
  messagingSenderId: "733778194563",
  appId: "1:733778194563:web:3caf289586502c26416bb6",
  measurementId: "G-36LGH6MHJ6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const getTable = async () => {
  try {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "opriva"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postTable = async (e: any) => {
  try {
    const db = getFirestore(app);
    await addDoc(collection(db, "opriva"), e);
  } catch (error) {
    console.log(error);
  }
};
