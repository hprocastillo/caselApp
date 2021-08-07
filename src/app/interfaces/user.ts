import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface User {
  id?: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
  userTokenPushNotification: string;
  userToken: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
