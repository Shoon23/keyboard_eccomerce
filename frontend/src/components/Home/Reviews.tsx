import React, { useState } from "react";
import { ChevronLeft, ChevronRight, StarFill } from "react-bootstrap-icons";
import user1 from "../../assets/img/user-1.jpeg";
import user2 from "../../assets/img/user-2.jpeg";
import user3 from "../../assets/img/user-3.jpeg";
import ReviewCard from "./ReviewCard";

function Reviews() {
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(3);
  const userReview = [
    {
      name: "John Doe",
      review:
        "' Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ex eos corporis atque officia laborum corrupti nesciunt voluptate exercitationem possimus officiis. '",
      img: user1,
    },
    {
      name: "Jane Doe",
      review:
        "' Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ex eos corporis atque officia laborum corrupti nesciunt voluptate exercitationem possimus officiis. '",
      img: user2,
      select: true,
    },
    {
      name: "Micheal Doe",
      review:
        "' Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ex eos corporis atque officia laborum corrupti nesciunt voluptate exercitationem possimus officiis. '",
      img: user3,
    },
    {
      name: "John Doe",
      review:
        "' Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ex eos corporis atque officia laborum corrupti nesciunt voluptate exercitationem possimus officiis. '",
      img: user3,
    },
    {
      name: "Jane Doe",
      review:
        "' Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ex eos corporis atque officia laborum corrupti nesciunt voluptate exercitationem possimus officiis. '",
      img: user1,
      select: true,
    },
    {
      name: "Diana Doe",
      review:
        "' Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ex eos corporis atque officia laborum corrupti nesciunt voluptate exercitationem possimus officiis. '",
      img: user2,
    },
  ];

  return (
    <section className="flex min-h-screen flex-col place-content-center">
      <div className="mt-2 text-center">
        <h1 className="text-2xl font-extrabold text-yellow-300">
          Customer reviews
        </h1>
        <h4 className="text-sm text-gray-300">
          What our Customers are saying...
        </h4>
      </div>
      <div className="flex flex-col gap-4 justify-self-end p-4 text-white lg:flex-row">
        {userReview
          .slice(start, end)
          .map(
            (
              user: { name: string; img: string; review: string },
              idx: number
            ) => (
              <ReviewCard
                key={idx}
                img={user.img}
                name={user.name}
                reviews={user.review}
              />
            )
          )}
      </div>
      <div className="mb-7 flex self-center text-white md:mt-5">
        <ChevronLeft
          onClick={() => {
            const curr = start === 0;
            const startTo = curr ? 3 : start - 3;
            const endTo = curr ? 6 : end - 3;
            setStart(startTo);
            setEnd(endTo);
          }}
          className="h-10 w-10 cursor-pointer hover:fill-gray-500"
        />
        <ChevronRight
          onClick={() => {
            const curr = end === userReview.length;
            const endTo = curr ? 3 : end + 3;
            const start = curr ? 0 : end;
            setStart(start);
            setEnd(endTo);
          }}
          className="h-10 w-10 cursor-pointer hover:fill-gray-500"
        />
      </div>
    </section>
  );
}

export default Reviews;
