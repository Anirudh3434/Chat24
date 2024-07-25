// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "./firebaseConfig"; 

const auth = getAuth(app);

export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

   
    await updateProfile(user, { displayName: name });


    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email
    });

    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const getCurrentUserName = () => {
  const user = auth.currentUser;
  return user ? user.displayName : null;
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
