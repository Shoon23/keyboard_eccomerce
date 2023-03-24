import React from "react";
import cta1 from "../../assets/img/cta-1.png";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="flex min-h-screen flex-col place-content-center  bg-sky-300">
      <h1 className="mb-10 mt-10 text-center  font-sans	text-3xl font-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit
      </h1>

      <Link
        to={"/products"}
        className="flex h-10 w-40 cursor-pointer items-center justify-center self-center rounded-2xl bg-yellow-500  text-white  shadow-lg hover:bg-yellow-600 hover:duration-300 hover:ease-in"
      >
        Shop Now
      </Link>
      <div className=" self-center drop-shadow-2xl">
        <img src={cta1} className=" object-cover" alt="keyboard" />
      </div>
    </section>
  );
}

export default CTA;
