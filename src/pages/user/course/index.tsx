import Course from "@/components/course/Course";
import PrivateRotes from "@/layouts/PrivateRotes";
import RootLayout from "@/layouts/RootLayout";
import React from "react";

const CoursePage = () => {
  return (
    <>
      <Course />
    </>
  );
};

export default CoursePage;

CoursePage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PrivateRotes>
      <RootLayout>{page}</RootLayout>
    </PrivateRotes>
  );
};
