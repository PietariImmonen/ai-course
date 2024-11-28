import { IPage } from "@/src/types/Page";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/src/components/ui/card";
import { useCourseStore } from "@/src/stores/course-store";
import SectionsComponent from "@/src/components/sections/sections-component";
import ReactPlayer from "react-player";
import GPTInput from "../gpt-input/gpt-input";
import { useState } from "react";
import ButtonNavigation from "@/src/components/page-navigation/button-navigation";

interface QuestionPageProps {
  page: IPage;
  currentPageIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const QuestionPage = ({
  page,
  currentPageIndex,
  handlePrevious,
  handleNext,
}: QuestionPageProps) => {
  const { sectionsAndPages } = useCourseStore();
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (prompt: string) => {
    setIsLoading(true);
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponse("An error occurred while processing your request.");
        setIsLoading(false);
      });
  };

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
          <GPTInput onSubmit={handleSubmit} />
          {isLoading && <p>Thinking...</p>}
          {response && (
            <div className="mt-4 p-4 bg-background rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Response:</h3>
              <ReactMarkdown className="prose prose-slate max-w-none space-y-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                {response}
              </ReactMarkdown>
            </div>
          )}
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

export default QuestionPage;
