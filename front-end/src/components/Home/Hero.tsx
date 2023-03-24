import React from "react";
import heroIcon from "../../assets/img/hero-icon-3.png";
import { ChevronDown } from "react-bootstrap-icons";

interface Props {
  heroRef: (node?: Element | null | undefined) => void;
}
function Hero({ heroRef }: Props) {
  return (
    <section
      ref={heroRef}
      className="flex min-h-screen flex-col items-center bg-sky-600 text-white  lg:flex-row  lg:p-12"
    >
      <div className="flex flex-col gap-5 p-10 text-center  lg:w-1/2">
        <h3 className="self-start text-4xl font-extrabold md:self-center md:text-5xl">
          Lorem ipsum dolor sit amet <br />
          consectetur adipisicing elit.
        </h3>
        <p className="text-slate-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non quae
          porro consequuntur eos similique repudiandae adipisci enim ratione
          dolorum ducimus, voluptas exercitationem, reprehenderit dicta.
        </p>
        <button className="h-10 w-36 self-center rounded-2xl bg-yellow-500 text-sm  shadow-lg hover:bg-yellow-600 hover:duration-300 hover:ease-in">
          Shop Now
        </button>
      </div>
      <div className="drop-shadow-2xl	lg:h-5/6 lg:w-1/2 ">
        <img src={heroIcon} className="object-cover " alt="" />
      </div>
      <ChevronDown className="hidden animate-bounce  md:left-[650px] md:top-[800px] md:block md:h-10 md:w-10  " />
    </section>
  );
}

export default Hero;
