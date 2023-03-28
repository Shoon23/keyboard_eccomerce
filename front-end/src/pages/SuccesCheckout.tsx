import React from "react";
import { usePageRef } from "../hooks/usePageRef";
import { Check } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
function SuccesCheckout() {
  const { pageRef } = usePageRef();
  return (
    <main ref={pageRef}>
      <section className="flex min-h-screen items-center justify-center">
        <div className="flex h-80 flex-col items-center justify-center rounded-md bg-white px-4 shadow-md ">
          <Check size={60} color="lightgreen" />
          <h1 className="text-4xl">Success Checkout</h1>
          <p className="">
            Check Your Orders Here{" "}
            <Link className="text-sky-600 underline" to={"/orders"}>
              Here
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default SuccesCheckout;
