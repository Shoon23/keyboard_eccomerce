import React from "react";
import { usePageRef } from "../hooks/usePageRef";
function SuccesCheckout() {
  const { pageRef } = usePageRef();
  return (
    <main ref={pageRef}>
      <section>success</section>
    </main>
  );
}

export default SuccesCheckout;
