"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCourseStore } from "@/src/stores/course-store";
import QuestionPage from "@/src/components/pages/question/question-page";
import TheoryPage from "@/src/components/pages/theory/theory-page";
import ButtonNavigation from "@/src/components/pages/page-navigation/button-navigation";

const Page = () => {
  const { id } = useParams();
  const {
    currentCourse,
    sectionsAndPages,
    setCurrentCourse,
    fetchSectionsAndPages,
  } = useCourseStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

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
    return <div>Loading...</div>;
  }

  const allPages = sectionsAndPages.pages;

  const currentPage = allPages[currentPageIndex];

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
      <h1 className="text-3xl font-bold mb-4">{currentCourse.name}</h1>
      <p className="text-lg mb-6">{currentCourse.description}</p>

      {currentPage && currentPage.type === "QUESTION" ? (
        <QuestionPage page={currentPage} />
      ) : (
        <TheoryPage page={currentPage} />
      )}

      <ButtonNavigation
        currentPageIndex={currentPageIndex}
        totalPages={allPages.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default Page;
