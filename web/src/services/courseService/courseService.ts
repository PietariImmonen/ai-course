/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseFormValues } from "@/src/components/course-editor/course-editor";
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

/**
 * Fetches a complete course with all its sections and pages
 * @param courseId - The ID of the course to fetch
 * @returns The complete course data with nested sections and pages
 */
export const getCourse = async (courseId: string) => {
  try {
    // Get the course document
    const courseDoc = await getDoc(doc(firestore, "courses", courseId));
    if (!courseDoc.exists()) {
      throw new Error("Course not found");
    }
    const courseData = courseDoc.data();

    // Get all sections
    const sectionsPromises = courseData.sections.map(
      async (sectionRef: any) => {
        const sectionDoc = await getDoc(sectionRef);
        const sectionData: any = sectionDoc.data();

        // Get all pages for this section
        const pagesPromises = sectionData.pages.map(async (pageRef: any) => {
          const pageDoc = await getDoc(pageRef);
          const data: any = pageDoc.data();
          return { id: pageDoc.id, ...data };
        });
        const pages = await Promise.all(pagesPromises);

        return {
          id: sectionDoc.id,
          title: sectionData.title,
          description: sectionData.description,
          pages: pages,
          sectionImage: sectionData.sectionImage || "",
        };
      },
    );

    const sections = await Promise.all(sectionsPromises);

    return {
      id: courseDoc.id,
      name: courseData.name,
      description: courseData.description,
      sections: sections,
    };
  } catch (error) {
    console.error("Error fetching complete course:", error);
    throw error;
  }
};

/**
 * Updates an existing course with all its sections and pages
 * @param data - The complete course data to update
 * @returns The updated course data
 */
export const updateCourse = async (data: CourseFormValues) => {
  try {
    const timestamp = Timestamp.now();

    // Update or create sections
    const sectionRefs = await Promise.all(
      data.sections.map(async (section) => {
        const sectionRef = doc(firestore, "sections", section.id);

        // Create or update pages for this section
        const pageRefs = await Promise.all(
          section.pages.map(async (page) => {
            const pageRef = doc(firestore, "pages", page.id);
            const pageData = {
              id: page.id,
              type: page.type,
              title: page.title,
              content: page.content,
              videoUrl: page.videoUrl,
              sectionId: section.id,
              updatedAt: timestamp,
            };
            await setDoc(pageRef, pageData, { merge: true });
            return pageRef;
          }),
        );

        // Update section
        const sectionData = {
          id: section.id,
          title: section.title,
          description: section.description,
          pages: pageRefs,
          sectionImage: section.sectionImage,
          updatedAt: timestamp,
        };
        await setDoc(sectionRef, sectionData, { merge: true });
        return sectionRef;
      }),
    );

    // Update course
    const courseRef = doc(firestore, "courses", data.id);
    const courseData = {
      id: data.id,
      name: data.name,
      description: data.description,
      sections: sectionRefs,
      updatedAt: timestamp,
    };
    await setDoc(courseRef, courseData, { merge: true });

    return courseData;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};
