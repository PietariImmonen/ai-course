import { getDoc } from "firebase/firestore";
import { getCourseById } from "../courseService/courseService";
import { ICourse } from "@/src/types/Course";
import { ISection } from "@/src/types/Section";
import { IPage } from "@/src/types/Page";

export const getSectionsWithRef = async (
  courseId: string,
): Promise<{ course: ICourse | null; sections: ISection[] }> => {
  const course: ICourse | null = await getCourseById(courseId);
  if (course) {
    const sectionRefs = course.sections;
    const sectionsData = await Promise.all(
      sectionRefs.map(async (ref) => {
        const sectionSnapshot = await getDoc(ref);
        return {
          id: sectionSnapshot.id,
          ...sectionSnapshot.data(),
        } as ISection;
      }),
    );
    return { course, sections: sectionsData };
  }
  return { course: null, sections: [] };
};

export const getSectionsAndPages = async (
  courseId: string,
): Promise<{ sections: ISection[]; pages: IPage[] }> => {
  const { sections } = await getSectionsWithRef(courseId);
  const pagesMap = new Map<string, IPage>();

  // Get pages for each section and store them in a map to avoid duplicates
  await Promise.all(
    sections.map(async (section) => {
      const pagePromises = section.pages.map(async (pageRef) => {
        const pageSnapshot = await getDoc(pageRef);
        const pageData = {
          id: pageSnapshot.id,
          ...pageSnapshot.data(),
          sectionId: section.id,
        } as IPage;
        pagesMap.set(pageSnapshot.id, pageData);
        return pageData;
      });
      await Promise.all(pagePromises);
    }),
  );

  // Convert map to array
  const pages = Array.from(pagesMap.values());

  return { sections, pages };
};
