import { DocumentReference, Timestamp } from "firebase/firestore";

export interface ICourse {
  id: string;
  name: string;
  description: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  sections: DocumentReference[];
}
