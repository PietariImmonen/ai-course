import { IPage } from "@/src/types/Page";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { Video } from "../../video/video";
import { Card, CardContent } from "@/src/components/ui/card";
import GPTInput from "../gpt-input/gpt-input";

interface QuestionPageProps {
  page: IPage;
}

const QuestionPage = ({ page }: QuestionPageProps) => {
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
    <Card className="w-full">
      <CardContent className="p-6">
        {page.videoUrl && <Video videoUrl={page.videoUrl} />}
        <ReactMarkdown>{page.content}</ReactMarkdown>
        <GPTInput onSubmit={handleSubmit} />
        {isLoading && <p>Thinking...</p>}
        {response && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Response:</h3>
            <ReactMarkdown>{response}</ReactMarkdown>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionPage;
