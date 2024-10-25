import { Timestamp } from "firebase/firestore";

export type IPageType = "QUESTION" | "THEORY"; // If QUESTION, then a CGPT box is rendered

export interface IPage {
  id: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  type: IPageType;
  content: string; //The content here is markdown.
}
