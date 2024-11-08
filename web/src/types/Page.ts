import { Timestamp } from "firebase/firestore";

export type IPageType = "QUESTION" | "THEORY" | "FILL_GAP"; // If QUESTION, then a CGPT box is rendered

export interface IPage {
  id: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  type: IPageType;
  title: string;
  content: string; //The content here is markdown.
  videoUrl?: string; // There could be a video url
  sectionId: string;
  prompt?: string; // If type is FILL_GAP, then a prompt is required
  promptVariables?: string[]; // If type is FILL_GAP, then a promptVariables is required
}
