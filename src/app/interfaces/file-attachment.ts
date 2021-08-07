import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface FileAttachment {
  id?: string;
  codeContract:string;
  downloadURL: string;
  path:string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
