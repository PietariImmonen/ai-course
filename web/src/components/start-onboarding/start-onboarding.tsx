"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useWelcomeStore } from "@/src/stores/welcome-store";

const StartOnboarding = () => {
  const { setCurrentStep } = useWelcomeStore();

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="max-w-2xl sm:mx-auto mx-2">
        <CardHeader>
          <CardTitle>Welcome to the AI Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            We would like to personalize your learning experience. Please take a
            moment to tell us about yourself so we can customize the course
            content for you.
          </p>
          <Button
            onClick={() => setCurrentStep("welcome-form")}
            className="w-full"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartOnboarding;
