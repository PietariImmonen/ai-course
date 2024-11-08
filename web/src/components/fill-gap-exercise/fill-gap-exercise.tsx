import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ReactMarkdown from "react-markdown";

interface FillGapExerciseProps {
  prompt: string;
  variables: string[];
}

export function FillGapExercise({ prompt, variables }: FillGapExerciseProps) {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (variable: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [variable]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let promptWithAnswers = prompt;
    variables.forEach((variable) => {
      const placeholder = `{${variable}}`;
      promptWithAnswers = promptWithAnswers.replace(
        placeholder,
        answers[variable] || "",
      );
    });

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: promptWithAnswers }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderPromptWithInputs = () => {
    const parts = prompt.split(/\{([^}]+)\}/);
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return part;
      } else {
        const variable = part;
        return (
          <Input
            key={index}
            value={answers[variable] || ""}
            onChange={(e) => handleInputChange(variable, e.target.value)}
            className="inline-block w-32 mx-1"
          />
        );
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="prose max-w-none">
        <div className="leading-relaxed">{renderPromptWithInputs()}</div>
      </div>
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Sending..." : "Submit"}
      </Button>
      {response && (
        <div className="mt-4 p-4 bg-background rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Response:</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
