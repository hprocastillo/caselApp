import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;

export interface Contract {
  id?: string;
  customerId: string;//from enterprises collection
  code: string;
  contractTypeId: string;//from contractTypes collection
  supplierId: string; //from enterprises collection
  contractGoalId: string; // from contractGoals collection
  agreedPayment: string;
  observations: string;
  attachments: boolean;
  fileUrl?: string;
  dateStart: Timestamp;
  dateEnd: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  userId: string; //from session
  userDisplayName: string;
  userEmail: string;
  userPhotoUrl: string;
}
