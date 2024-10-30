import { firestore } from "@/src/config/firebase";
import { ICourse } from "@/src/types/Course";
import { IPage } from "@/src/types/Page";
import { ISection } from "@/src/types/Section";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  Timestamp,
  DocumentReference,
  setDoc,
} from "firebase/firestore";

/**
 * Fetches all courses from the database
 * @returns An array of courses
 */
export const getCourses = async () => {
  try {
    const coursesCollection = collection(firestore, "courses");
    const coursesSnapshot = await getDocs(coursesCollection);
    const coursesData: ICourse[] = coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ICourse[];
    return coursesData;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

/**
 * Fetches a course by its ID
 * @param courseId - The ID of the course to fetch
 * @returns The course data
 */
export const getCourseById = async (
  courseId: string,
): Promise<ICourse | null> => {
  try {
    console.log(courseId);
    const courseDoc = doc(firestore, "courses", courseId);
    const courseSnapshot = await getDoc(courseDoc);
    console.log(courseSnapshot.data());
    return {
      id: courseSnapshot.id,
      ...courseSnapshot.data(),
    } as ICourse;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

export const createCourse = async (data: {
  name: string;
  description: string;
  sections: {
    title: string;
    description: string;
    pages: {
      type: "THEORY" | "QUESTION";
      content: string;
      videoUrl?: string;
    }[];
  }[];
}) => {
  try {
    const timestamp = Timestamp.now();

    // Create pages first
    const pageRefs: { [key: string]: DocumentReference } = {};
    for (const section of data.sections) {
      for (const page of section.pages) {
        const pageRef = doc(collection(firestore, "pages"));
        const pageData: IPage = {
          id: pageRef.id, // Using Firebase auto-generated ID
          type: page.type,
          content: page.content,
          videoUrl: page.videoUrl,
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        await setDoc(pageRef, pageData);
        pageRefs[pageRef.id] = pageRef;
      }
    }

    // Create sections
    const sectionRefs: DocumentReference[] = [];
    for (const section of data.sections) {
      const sectionRef = doc(collection(firestore, "sections"));
      const sectionData: ISection = {
        id: sectionRef.id, // Using Firebase auto-generated ID
        title: section.title,
        description: section.description,
        pages: Object.values(pageRefs),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      await setDoc(sectionRef, sectionData);
      sectionRefs.push(sectionRef);
    }

    // Create course
    const courseRef = doc(collection(firestore, "courses"));
    const courseData: ICourse = {
      id: courseRef.id, // Using Firebase auto-generated ID
      name: data.name,
      description: data.description,
      sections: sectionRefs,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    await setDoc(courseRef, courseData);

    return courseData;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};
