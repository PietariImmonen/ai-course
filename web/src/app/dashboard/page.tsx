"use client";

import { useCourseStore } from "@/src/stores/course-store";
import { useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const Page = () => {
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Courses</h1>

      <div>
        {courses.map((course) => (
          <Card key={course.id} className="max-w-[300px]">
            <CardHeader>
              <CardTitle>{course.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course.description}</p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/dashboard/edit-course/${course.id}`}
                passHref
                className="p-2 border rounded-md"
              >
                Edit course
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Page;
