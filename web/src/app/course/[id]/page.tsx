"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useCourseStore } from "@/src/stores/course-store";
import TheoryPage from "@/src/sections/pages/theory/theory-page";
import QuestionPage from "@/src/sections/pages/question/question-page";
import LoadingScreen from "@/src/components/loaders/loading-screen";
import FillGapPage from "@/src/sections/pages/fill-gap/fill-gap-page";

const Page = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const {
    currentCourse,
    sectionsAndPages,
    setCurrentCourse,
    fetchSectionsAndPages,
  } = useCourseStore();

  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    return parseInt(searchParams.get("page") || "0");
  });

  // Update current page when URL parameters change
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "0");
    setCurrentPageIndex(page);
  }, [searchParams]);

  useEffect(() => {
    if (!currentCourse || !sectionsAndPages.sections.length) return;

    // Calculate total pages in each section
    const pagesPerSection = sectionsAndPages.sections.map((section) => {
      // Get pages for current section
      const sectionPages = sectionsAndPages.pages.filter(
        (page) => page.sectionId === section.id,
      ).length;

      return sectionPages;
    });

    // Find which section the current page belongs to
    let section = 0;
    let pageCount = 0;
    for (let i = 0; i < pagesPerSection.length; i++) {
      pageCount += pagesPerSection[i];
      if (currentPageIndex < pageCount) {
        section = i;
        break;
      }
    }

    const newUrl = `?section=${section}&page=${currentPageIndex}`;
    window.history.replaceState({}, "", newUrl);
  }, [
    currentPageIndex,
    currentCourse,
    id,
    sectionsAndPages.sections,
    sectionsAndPages.pages,
  ]);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (typeof id === "string") {
        await setCurrentCourse(id);
        await fetchSectionsAndPages(id);
      }
    };
    fetchCourseData();
  }, [id, setCurrentCourse, fetchSectionsAndPages]);

  if (!currentCourse || !sectionsAndPages.sections.length) {
    return <LoadingScreen />;
  }

  const allPages = sectionsAndPages.pages || [];

  const currentPage = allPages[currentPageIndex];

  if (!currentPage) {
    return <LoadingScreen />;
  }

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPageIndex < allPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  return (
    <div className="p-6">
      {currentPage.type === "QUESTION" ? (
        <QuestionPage
          page={currentPage}
          currentPageIndex={currentPageIndex}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      ) : currentPage.type === "FILL_GAP" ? (
        <FillGapPage
          page={currentPage}
          currentPageIndex={currentPageIndex}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      ) : (
        <TheoryPage
          page={currentPage}
          currentPageIndex={currentPageIndex}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      )}
    </div>
  );
};

export default Page;
