import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "../components/Home/Headers";
import Footer from "../components/Home/Footer";
import { useInView } from "react-intersection-observer";

function Layout() {
  const { ref: pageRef, inView } = useInView();

  return (
    <>
      <Headers isHeroInView={inView} />
      <Outlet context={{ pageRef }} />
      <Footer />
    </>
  );
}

export default Layout;
