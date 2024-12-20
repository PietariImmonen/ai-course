import { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Separator } from "@/src/components/ui/separator";

interface GPTInputProps {
  onSubmit: (prompt: string) => void;
}

const GPTInput: React.FC<GPTInputProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
    // For demonstration purposes, we're setting a mock response
    // In a real application, you'd wait for the actual response from the API
    setResponse(`This is a response to:"${prompt}"`);
    setPrompt("");
  };

  return (
    <div className="mt-4">
      <Separator className="my-4" />
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt for ChatGPT..."
          className="mb-2"
        />
        <Button type="submit">Submit</Button>
      </form>
      {response && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">ChatGPT Response:</h3>
          <ReactMarkdown className="prose prose-slate max-w-none space-y-4 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            {response}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default GPTInput;
