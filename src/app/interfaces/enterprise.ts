import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Enterprise {
  id?: string;
  type: string;//customer, supplier
  name: string;
  ruc: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
