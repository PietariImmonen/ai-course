"use client";

import { useWelcomeStore } from "@/src/stores/welcome-store";
import WelcomeMessageForm from "@/src/components/welcome-message-form/welcome-message-form";
import StartOnboarding from "@/src/components/start-onboarding/start-onboarding";
import WelcomeMessage from "@/src/components/welcome-message/welcome-message";

const OnboardingSection = () => {
  const { currentStep } = useWelcomeStore();

  return currentStep === "start" ? (
    <StartOnboarding />
  ) : currentStep === "welcome-form" ? (
    <WelcomeMessageForm />
  ) : currentStep === "welcome-message" ? (
    <WelcomeMessage />
  ) : null;
};
export default OnboardingSection;
