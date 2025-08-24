
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAsUhMh5c0S8L4EVMIaUOZcvYbOf-CAYfE",
  authDomain: "netflix-clone-a5bcc.firebaseapp.com",
  projectId: "netflix-clone-a5bcc",
  storageBucket: "netflix-clone-a5bcc.firebasestorage.app",
  messagingSenderId: "59541870583",
  appId: "1:59541870583:web:e9d6921072cf260b0840f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};


const login = async (email,password)=>{

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
        
    }

}

const logout = ()=>{
    signOut(auth);
}

export  { auth, db, login, signup, logout };