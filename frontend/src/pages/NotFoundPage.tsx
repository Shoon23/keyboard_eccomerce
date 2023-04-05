import React from "react";
import { usePageRef } from "../hooks/usePageRef";
import { Link } from "react-router-dom";
function NotFoundPage() {
  const { pageRef } = usePageRef();
  return (
    <main ref={pageRef}>
      <section className="flex min-h-screen items-center justify-center text-2xl">
        <p>
          Page not found go to{" "}
          <Link to={"/"} className="text-white underline">
            Home
          </Link>
        </p>
      </section>
    </main>
  );
}

export default NotFoundPage;
