import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface ContractGoal {
  id?:string;
  description:string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
