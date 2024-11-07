"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { createCourse } from "@/src/services/courseService/courseService";
import { useToast } from "@/src/hooks/use-toast";
import { useState } from "react";

const pageSchema = z.object({
  id: z.string(),
  type: z.enum(["THEORY", "QUESTION"]),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  videoUrl: z.string().optional(),
  sectionId: z.string(),
});

const sectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  pages: z.array(pageSchema),
  sectionImage: z.string().optional(),
});

const courseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Course name is required"),
  description: z.string().min(1, "Course description is required"),
  sections: z.array(sectionSchema),
});

type CourseFormValues = z.infer<typeof courseSchema>;

// Helper function to generate unique IDs (simplified for this example)
const generateId = () => Math.random().toString(36).substr(2, 9);

export default function CourseDesigner() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      id: generateId(),
      name: "",
      description: "",
      sections: [],
    },
  });

  const { toast } = useToast();

  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    name: "sections",
    control: form.control,
  });

  const addSection = () => {
    appendSection({
      id: generateId(),
      title: "",
      description: "",
      pages: [],
      sectionImage: "",
    });
  };

  const addPage = (sectionIndex: number) => {
    const sectionId = form.getValues(`sections.${sectionIndex}.id`);
    const pagesArray = form.getValues(`sections.${sectionIndex}.pages`) || [];
    form.setValue(`sections.${sectionIndex}.pages`, [
      ...pagesArray,
      {
        id: generateId(),
        type: "THEORY",
        title: "",
        content: "",
        videoUrl: "",
        sectionId,
      },
    ]);
  };

  const onSubmit = async (data: CourseFormValues) => {
    setIsLoading(true);
    try {
      await createCourse(data);
      toast({
        title: "Course created successfully",
        description: "Your course has been created successfully",
      });
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function removePage(sectionIndex: number, pageIndex: number): void {
    const pagesArray = form.getValues(`sections.${sectionIndex}.pages`);
    const newPagesArray = pagesArray.filter((_, index) => index !== pageIndex);
    form.setValue(`sections.${sectionIndex}.pages`, newPagesArray);
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Course Designer</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Course Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Course Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {sectionFields.map((section, sectionIndex) => (
            <Card key={section.id} className="mt-4">
              <CardHeader>
                <CardTitle>Section {sectionIndex + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name={`sections.${sectionIndex}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Section Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sections.${sectionIndex}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Section Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sections.${sectionIndex}.sectionImage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Section Image URL (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="mr-2"
                  onClick={() => removeSection(sectionIndex)}
                >
                  Remove Section
                </Button>

                {form
                  .watch(`sections.${sectionIndex}.pages`)
                  .map((page, pageIndex) => (
                    <Card key={page.id} className="mt-4">
                      <CardHeader>
                        <CardTitle>Page {pageIndex + 1}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`sections.${sectionIndex}.pages.${pageIndex}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Page Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select page type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="THEORY">Theory</SelectItem>
                                  <SelectItem value="QUESTION">
                                    Question
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`sections.${sectionIndex}.pages.${pageIndex}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Page Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Page Title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`sections.${sectionIndex}.pages.${pageIndex}.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Page Content (Markdown)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`sections.${sectionIndex}.pages.${pageIndex}.videoUrl`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video URL</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Video URL (optional)"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => removePage(sectionIndex, pageIndex)}
                        >
                          Remove Page
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                <Button type="button" onClick={() => addPage(sectionIndex)}>
                  Add Page
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button type="button" onClick={addSection}>
            Add Section
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Course Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(form.watch(), null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Course"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
