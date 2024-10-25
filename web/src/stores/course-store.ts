import { create } from "zustand";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { ICourse } from "../types/Course";
import { ISection } from "../types/Section";
import { IPage } from "../types/Page";
import {
  getCourseById,
  getCourses,
} from "../services/courseService/courseService";
import {
  getSectionsAndPages,
  getSectionsWithRef,
} from "../services/sectionService/sectionService";

interface CourseStore {
  courses: ICourse[];
  currentCourse: ICourse | null;
  sections: ISection[];
  pages: IPage[];
  sectionsAndPages: { sections: ISection[]; pages: IPage[] };
  fetchCourses: () => Promise<void>;
  setCurrentCourse: (courseId: string) => Promise<void>;
  fetchSections: (courseId: string) => Promise<void>;
  fetchSectionsAndPages: (courseId: string) => Promise<void>;
  fetchPages: (sectionId: string) => Promise<void>;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  currentCourse: null,
  sections: [],
  pages: [],
  sectionsAndPages: { sections: [], pages: [] },
  fetchCourses: async () => {
    const coursesData = await getCourses();
    set({ courses: coursesData });
  },

  setCurrentCourse: async (courseId: string) => {
    const courseData: ICourse | null = await getCourseById(courseId);
    set({ currentCourse: courseData });
  },

  fetchSections: async (courseId: string) => {
    const { sections } = await getSectionsWithRef(courseId);
    set({ sections });
  },

  fetchSectionsAndPages: async (courseId: string) => {
    const { sections, pages } = await getSectionsAndPages(courseId);
    set({ sectionsAndPages: { sections, pages } });
  },

  fetchPages: async (sectionId: string) => {
    const sectionDoc = doc(firestore, "sections", sectionId);
    const sectionSnapshot = await getDoc(sectionDoc);
    if (sectionSnapshot.exists()) {
      const sectionData = sectionSnapshot.data() as ISection;
      const pageRefs = sectionData.pages;
      const pagesData = await Promise.all(
        pageRefs.map(async (ref) => {
          const pageSnapshot = await getDoc(ref);
          return { id: pageSnapshot.id, ...pageSnapshot.data() } as IPage;
        }),
      );
      set({ pages: pagesData });
    }
  },
}));
