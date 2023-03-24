import React from "react";

interface Props {
  firstName: string;
  lastName: string;
  email: String;
}

function PersonalInfo({ firstName, lastName, email }: Props) {
  return (
    <section className="flex  flex-col place-items-center items-center bg-white py-10 md:w-2/3">
      <h1 className="mb-5 font-black md:text-xl">Personal Information</h1>
      <div className="flex place-items-center gap-2">
        <label className="text-gray-500">First Name:</label>
        <h1 className="font-black md:text-xl">{firstName}</h1>
      </div>
      <div className="flex place-items-center gap-2">
        <label className="text-gray-500">Last Name:</label>
        <h1 className="font-black md:text-xl">{lastName}</h1>
      </div>
      <div className="flex place-items-center gap-2">
        <label className="text-gray-500">Email: </label>
        <h1 className="font-black md:text-xl">{email}</h1>
      </div>
    </section>
  );
}

export default PersonalInfo;
