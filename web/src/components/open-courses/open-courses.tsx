"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect } from "react";
import { useCourseStore } from "@/src/stores/course-store";

const OpenCourses = () => {
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Courses</h1>

      <div className="flex flex-wrap gap-4">
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
                href={`/course/${course.id}`}
                passHref
                className="p-2 border rounded-md"
              >
                View Course
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default OpenCourses;
