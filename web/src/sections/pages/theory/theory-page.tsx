import { IPage } from "@/src/types/Page";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/src/components/ui/card";

import { useCourseStore } from "@/src/stores/course-store";
import SectionsComponent from "@/src/components/sections/sections-component";
import ReactPlayer from "react-player";
import ButtonNavigation from "@/src/components/page-navigation/button-navigation";

interface TheoryPageProps {
  page: IPage;
  currentPageIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const TheoryPage = ({
  page,
  currentPageIndex,
  handlePrevious,
  handleNext,
}: TheoryPageProps) => {
  const { sectionsAndPages } = useCourseStore();

  return (
    <div className="flex gap-4 w-full max-w-6xl mx-auto px-4 sm:flex-row flex-col">
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="aspect-video relative rounded-lg overflow-hidden bg-background mb-6">
            {page.videoUrl ? (
              <ReactPlayer
                url={page.videoUrl}
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No video available</span>
              </div>
            )}
          </div>
          <div className="prose max-w-none mt-4">
            <h1 className="text-2xl font-bold mb-2">{page.title}</h1>
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
      <div className="sm:w-1/5 flex sm:flex-col flex-col-reverse">
        {sectionsAndPages.sections && (
          <div className="mb-8">
            <SectionsComponent
              sections={sectionsAndPages.sections}
              pages={sectionsAndPages.pages}
            />
          </div>
        )}
        <ButtonNavigation
          currentPageIndex={currentPageIndex}
          totalPages={sectionsAndPages.pages.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default TheoryPage;
