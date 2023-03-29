import React from "react";
import feature1 from "../../assets/img/feature-1.jpeg";
import feature2 from "../../assets/img/feature-2.jpeg";
import feature3 from "../../assets/img/feature-3.jpeg";
interface Props {}

const Features = ({}: Props) => {
  return (
    <section className="flex min-h-screen flex-col bg-white">
      <div className="bg-gray-200 lg:flex lg:place-items-center">
        <div className="mt-4  p-3	text-center">
          <h1 className="text-2xl lg:mb-2 lg:text-5xl">Quality</h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cupiditate deserunt possimus eligendi sequi accusantium ipsa minus,
            rem ea voluptates quaerat voluptate et. Dolorum, odio. Cupiditate
            minus esse temporibus magnam.
          </p>
        </div>
        <div className=" p-10">
          <img src={feature1} className="h-auto w-full rounded-md" alt="" />
        </div>
      </div>
      <div className="lg:flex lg:flex-row-reverse lg:place-items-center">
        <div className="mt-4 p-3 text-center">
          <h1 className="text-2xl lg:mb-2 lg:text-5xl">User Experience</h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cupiditate deserunt possimus eligendi sequi accusantium ipsa minus,
            rem ea voluptates quaerat voluptate et. Dolorum, odio. Cupiditate
            minus esse temporibus magnam.
          </p>
        </div>
        <div className="p-10">
          <img src={feature2} className="h-auto w-full rounded-md" alt="" />
        </div>
      </div>
      <div className="bg-gray-200 lg:flex  lg:place-items-center">
        <div className="mt-4 p-3 text-center ">
          <h1 className="text-2xl lg:mb-2 lg:text-5xl">Gaming Mode</h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            cupiditate deserunt possimus eligendi sequi accusantium ipsa minus,
            rem ea voluptates quaerat voluptate et. Dolorum, odio. Cupiditate
            minus esse temporibus magnam.
          </p>
        </div>
        <div className="p-10 ">
          <img src={feature3} className="h-auto w-full rounded-md" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Features;
