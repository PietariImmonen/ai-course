import { DocumentReference, Timestamp } from "firebase/firestore";

export interface ISection {
  id: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  title: string;
  description: string;
  pages: DocumentReference[];
  sectionImage?: string;
}
