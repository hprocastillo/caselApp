import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface ContractType {
  id?:string;
  name:string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
