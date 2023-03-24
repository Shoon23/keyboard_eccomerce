import React from "react";
import { iProductReview } from "../../types";
import StarList from "./StarList";

interface Props {
  review: iProductReview;
}

function ReviewCard({ review }: Props) {
  return (
    <div className="flex flex-col gap-2 border-2 border-gray-500 p-2">
      <h1 className="text-2xl">
        {review?.user?.firstName} {review?.user?.lastName}
      </h1>
      <StarList color="skyblue" size={25} startFill={review?.reviewStar} />
      <p className="text-gray-600">{review?.reviewDescription}</p>
    </div>
  );
}

export default ReviewCard;
