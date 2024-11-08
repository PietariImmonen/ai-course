import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

interface FillGapEditorProps {
  value: string;
  onChange: (value: string, variables: string[]) => void;
}

export function FillGapEditor({ value, onChange }: FillGapEditorProps) {
  const [text, setText] = useState(value);

  const handleTextChange = (newText: string) => {
    setText(newText);
    // Extract variables from text (anything between {})
    const variables = (newText.match(/\{([^}]+)\}/g) || []).map(
      (v) => v.slice(1, -1), // Remove { and }
    );
    onChange(newText, variables);
  };

  // Sync with external value changes
  useEffect(() => {
    if (value !== text) {
      setText(value);
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <Textarea
        value={text}
        onChange={(e) => handleTextChange(e.target.value)}
        placeholder="Enter text with variables in curly braces, e.g.: The capital of France is {Paris}"
        className="min-h-[200px]"
      />
      <div className="text-sm text-muted-foreground">
        Variables will be automatically extracted from text in curly braces:{" "}
        {"{variable}"}
      </div>
    </div>
  );
}
