import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "../firebase/config";
import { ILoggedInUser, ITrackingListItem } from "../interfaces/IUser";

export const CreateUser = async (user: ILoggedInUser) => {
  try {
    const docRef = doc(db, "users", user.id);
    await setDoc(docRef, user);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const IsUserExists = async (steamId: string) => {
  const userRef = doc(db, "users", steamId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
};

export const AddUserToTrackingList = async (
  steamId: string,
  updatedTrackingList: ITrackingListItem[]
) => {
  try {
    const userDocRef = doc(db, "users", steamId);
    await setDoc(
      userDocRef,
      {
        trackingList: updatedTrackingList,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating trackingList: ", error);
  }
};

export const GetUserData = async (steamId: string) => {
  try {
    const userDocRef = doc(db, "users", steamId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data() as ILoggedInUser;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user data: ", error);
  }
};
