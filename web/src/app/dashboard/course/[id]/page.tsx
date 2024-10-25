"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCourseStore } from "@/src/stores/course-store";
import { ISection } from "@/src/types/Section";
import { IPage } from "@/src/types/Page";
import { Button } from "@/src/components/ui/button";

const Page = () => {
  const { id } = useParams();
  const {
    currentCourse,
    sectionsAndPages,
    setCurrentCourse,
    fetchSectionsAndPages,
  } = useCourseStore();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const allItems: (ISection | IPage)[] = [
    ...sectionsAndPages.sections,
    ...sectionsAndPages.pages,
  ];

  const currentItem = allItems[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(allItems.length - 1, prevIndex + 1),
    );
  };

  console.log(sectionsAndPages);

  return (
    <div>
      <h1>{currentCourse.name}</h1>
      <p>{currentCourse.description}</p>
      <div>
        {currentItem && "title" in currentItem ? (
          <div>
            <h2>Section: {currentItem.title}</h2>
            <p>{currentItem.description}</p>
          </div>
        ) : currentItem && "content" in currentItem ? (
          <div>
            <p>{currentItem.content}</p>
          </div>
        ) : null}
      </div>
      <div>
        <Button onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === allItems.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Page;
