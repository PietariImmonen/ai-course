import { create } from "zustand";

type OnboardingStep = "start" | "welcome-form" | "welcome-message";

interface WelcomeStore {
  welcomeMessage: string | null;
  currentStep: OnboardingStep;
  setWelcomeMessage: (message: string) => void;
  setCurrentStep: (step: OnboardingStep) => void;
  reset: () => void;
}

export const useWelcomeStore = create<WelcomeStore>((set) => ({
  welcomeMessage: null,
  currentStep: "start",
  setWelcomeMessage: (message) => set({ welcomeMessage: message }),
  setCurrentStep: (step) => set({ currentStep: step }),
  reset: () => set({ welcomeMessage: null, currentStep: "start" }),
}));
