import { firestore } from "@/src/config/firebase";
import { ICourse } from "@/src/types/Course";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";

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
