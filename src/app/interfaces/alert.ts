import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Alert {
  id?: string;
  nameAlert: string;
  contractCode:string;
  contractTypeId?: string;// from contract types collection
  contractGoalId?: string;//from contract goals collection
  supplierId?: string;// from suppliers collection
  customerId?: string;//from customers collection
  dateAlert: string;
  timeAlert: string;
  dateTimeAlert: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string;//from session
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}

