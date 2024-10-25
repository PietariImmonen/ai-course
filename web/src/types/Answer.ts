import { DocumentReference, Timestamp } from "firebase/firestore";

export interface IAnswer {
  id: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  userRef: DocumentReference;
  pageRef: DocumentReference;
  answer: string;
}
