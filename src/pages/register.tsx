import Login from "@/components/login/Login";
import Register from "@/components/register/Register";
import PublicRotes from "@/layouts/PublicRoutes";
import RootLayout from "@/layouts/RootLayout";
import React from "react";

const RegisterPage = () => {
  return (
    <>
      <Register />
    </>
  );
};

export default RegisterPage;

RegisterPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PublicRotes>
      <RootLayout>{page}</RootLayout>
    </PublicRotes>
  );
};
