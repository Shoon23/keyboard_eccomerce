import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col gap-5 bg-slate-300 p-10 text-gray-600 md:flex-row md:place-content-center lg:gap-20">
      <div className="flex flex-col">
        <h1 className="font-mono text-2xl font-bold text-black ">Keyboard</h1>
        <p>Providing reliable tech since 1992</p>
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-xl font-bold text-black">Services</span>
        <a className="">Branding</a>
        <a className="">Design</a>
        <a className="">Marketing</a>
        <a className="">Advertisement</a>
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-xl font-bold text-black">Company</span>
        <a className="">About us</a>
        <a className="">Contact</a>
        <a className="">Jobs</a>
        <a className="">Press kit</a>
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-xl font-bold text-black">Legal</span>
        <a className="">Terms of use</a>
        <a className="">Privacy policy</a>
        <a className="">Cookie policy</a>
      </div>
    </footer>
  );
}

export default Footer;
