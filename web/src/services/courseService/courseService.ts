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
      title: string;
      content: string;
      videoUrl?: string;
    }[];
  }[];
}) => {
  try {
    const timestamp = Timestamp.now();

    // Create sections first
    const sectionRefs: DocumentReference[] = [];
    const sectionIds: { [key: string]: string } = {};
    for (const section of data.sections) {
      const sectionRef = doc(collection(firestore, "sections"));
      sectionIds[section.title] = sectionRef.id;
      const sectionData: ISection = {
        id: sectionRef.id,
        title: section.title,
        description: section.description,
        pages: [], // Will be updated after creating pages
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      await setDoc(sectionRef, sectionData);
      sectionRefs.push(sectionRef);
    }

    // Create pages and update sections with page references
    for (let i = 0; i < data.sections.length; i++) {
      const section = data.sections[i];
      const sectionRef = sectionRefs[i];
      const sectionId = sectionIds[section.title];
      const sectionPageRefs: DocumentReference[] = [];

      // Create pages for this section
      for (const page of section.pages) {
        const pageRef = doc(collection(firestore, "pages"));
        const pageData: IPage = {
          id: pageRef.id,
          type: page.type,
          title: page.title,
          content: page.content,
          videoUrl: page.videoUrl,
          sectionId: sectionId,
          createdAt: timestamp,
          updatedAt: timestamp,
        };
        await setDoc(pageRef, pageData);
        sectionPageRefs.push(pageRef);
      }

      // Update section with its page references
      await setDoc(sectionRef, { pages: sectionPageRefs }, { merge: true });
    }

    // Create course
    const courseRef = doc(collection(firestore, "courses"));
    const courseData: ICourse = {
      id: courseRef.id,
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
