import React from "react";
import { StarFill } from "react-bootstrap-icons";

interface Props {
  img: string;
  name: string;
  reviews: string;
}

function ReviewCard({ img, name, reviews }: Props) {
  return (
    <div key={img} className="rounded-lg  bg-white p-10 text-black">
      <div className="mb-2  flex place-items-center gap-5">
        <div className="w-30 h-28">
          <img
            src={img}
            className="h-full w-full rounded-full object-cover"
            alt="user img"
          />
        </div>
        <div className="flex flex-col">
          <h1>{name}</h1>
          <div className="flex">
            <StarFill className="h-7 w-7 fill-yellow-500" />
            <StarFill className="h-7 w-7 fill-yellow-500" />
            <StarFill className="h-7 w-7 fill-yellow-500" />
            <StarFill className="h-7 w-7 fill-yellow-500" />
            <StarFill className="h-7 w-7 fill-yellow-500" />
          </div>
        </div>
      </div>
      <p className="text-gray-400">{reviews}</p>
    </div>
  );
}

export default ReviewCard;
