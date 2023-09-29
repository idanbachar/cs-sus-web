import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase/config";
import { ILoggedInUser } from "../interfaces/IUser";

export const CreateUser = async (user: ILoggedInUser) => {
  try {
    const docRef = doc(db, "users", user.id);
    await setDoc(docRef, user);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const IsUserExists = async (steamId: string) => {
  const userRef = doc(db, "users", steamId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
};
