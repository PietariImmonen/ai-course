import { IPage } from "@/src/types/Page";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/src/components/ui/card";
import { useCourseStore } from "@/src/stores/course-store";
import SectionsComponent from "@/src/components/sections/sections-component";
import ReactPlayer from "react-player";
import { FillGapExercise } from "@/src/components/fill-gap-exercise/fill-gap-exercise";
import ButtonNavigation from "@/src/components/page-navigation/button-navigation";
import { Separator } from "@/src/components/ui/separator";

interface FillGapPageProps {
  page: IPage;
  currentPageIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const FillGapPage = ({
  page,
  currentPageIndex,
  handlePrevious,
  handleNext,
}: FillGapPageProps) => {
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
            <ReactMarkdown className="prose prose-slate max-w-none space-y-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              {page.content}
            </ReactMarkdown>
          </div>
          <Separator className="my-4" />
          <FillGapExercise
            prompt={page.prompt || ""}
            variables={page.promptVariables || []}
          />
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

export default FillGapPage;
