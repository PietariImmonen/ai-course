"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useWelcomeStore } from "@/src/stores/welcome-store";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  hobbies: z.string().min(1, "Hobbies are required"),
  jobRole: z.string().min(1, "Job role is required"),
  industry: z.string().min(1, "Industry is required"),
  personalGoals: z.string().min(1, "Personal goals are required"),
  aiKnowledge: z.string().min(1, "AI knowledge description is required"),
  challenges: z.string().min(1, "Challenges description is required"),
});

export default function WelcomeMessageForm() {
  const { setWelcomeMessage, setCurrentStep } = useWelcomeStore();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hobbies: "",
      firstName: "",
      jobRole: "",
      industry: "",
      personalGoals: "",
      aiKnowledge: "",
      challenges: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/welcome-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to generate welcome message");
      }

      const data = await response.json();
      setWelcomeMessage(data.message);
      setCurrentStep("welcome-message");
      toast.success("Welcome message generated successfully!");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to generate welcome message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-3xl sm:mx-auto my-10 mx-2">
      <CardHeader>
        <CardTitle>Tell us about yourself</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your first name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hobbies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your hobbies?</FormLabel>
                  <FormControl>
                    <Input placeholder="Hiking, Reading, Cooking" {...field} />
                  </FormControl>
                  <FormDescription>Add your hobbies one by one</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is your current job role?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input placeholder="Technology" {...field} />
                  </FormControl>
                  <FormDescription>
                    What industry do you work in?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personalGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personal Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What are your personal goals regarding AI?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share your personal goals and aspirations
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiKnowledge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>AI Knowledge</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What do you currently know about AI?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe your current understanding of AI
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What challenges do you face in your job?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the challenges you face in your work
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center justify-between sm:flex-row flex-col">
              <Button
                type="submit"
                disabled={isLoading}
                className="sm:w-auto w-full"
              >
                {isLoading
                  ? "Generating..."
                  : "Get your personalized welcome message"}
              </Button>
              <Button
                onClick={() => router.push("/course/N8YSKpN6QzewFrRkXq5x")}
                variant="outline"
                disabled={isLoading}
                className="sm:w-auto w-full"
              >
                Skip
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
