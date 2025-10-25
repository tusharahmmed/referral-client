import React from "react";

interface ILayout {
  children: React.ReactElement;
}

const RootLayout = ({ children }: ILayout) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
