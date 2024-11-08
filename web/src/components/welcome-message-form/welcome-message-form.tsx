/* eslint-disable react/no-unescaped-entities */
"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
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
  jobRole: z.string().min(1, "Job role is required"),
  hobbies: z.string().min(1, "Please tell us about your hobbies"),
  aiKnowledge: z.string().min(1, "Please tell us about your AI experience"),
});

export default function WelcomeMessageForm() {
  const { setWelcomeMessage, setCurrentStep } = useWelcomeStore();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      jobRole: "",
      hobbies: "",
      aiKnowledge: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Add default values for unused fields to maintain API compatibility
      const submitData = {
        ...values,
      };

      const response = await fetch("/api/welcome-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate welcome message");
      }

      const data = await response.json();
      setWelcomeMessage(data.message);
      setCurrentStep("welcome-message");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to generate welcome message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl sm:mx-auto my-10 mx-2">
      <CardHeader>
        <CardTitle>Welcome! Let's personalize your learning journey</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What's your first name?</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you do?</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Marketing Manager, Developer, Student"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hobbies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your hobbies and interests?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Photography, gaming, cooking, reading"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aiKnowledge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How familiar are you with AI?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Complete beginner, Used ChatGPT a few times, etc."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
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
                {isLoading ? "Creating your experience..." : "Start my journey"}
              </Button>
              <Button
                onClick={() => router.push("/course/N8YSKpN6QzewFrRkXq5x")}
                variant="outline"
                disabled={isLoading}
                className="sm:w-auto w-full"
              >
                Skip personalization
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
