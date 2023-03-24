import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import StarList from "./StarList";
import { iProductReview } from "../../types";

interface Props {
  productReviews: Array<iProductReview>;
  productId: string;
  setProductReviews: React.Dispatch<React.SetStateAction<iProductReview[]>>;
}

function ProductReview({
  productReviews,
  productId,
  setProductReviews,
}: Props) {
  const [isAddReview, setIsAddReview] = useState<boolean>(false);
  return (
    <section className="flex min-h-screen flex-col gap-3 bg-white p-3 ">
      <h1 className="self-center text-2xl">Reviews</h1>
      <div className="flex flex-col place-items-center gap-1">
        <h1 className="text-5xl">4.7</h1>
        <p className="text-gray-600">out of 5</p>
        <StarList color="black" size={30} startFill={4} />
        <p>based on 54k+ reviews</p>
      </div>

      <div
        className={`flex flex-col gap-2  overflow-y-scroll ${
          productReviews.length !== 0
            ? "max-h-screen"
            : "h-96 place-content-center place-items-center"
        }`}
      >
        {productReviews.length === 0 ? (
          <h1 className="text-3xl">No Reviews</h1>
        ) : (
          productReviews.map((review: iProductReview) => (
            <ReviewCard key={review.reviewId} review={review} />
          ))
        )}
      </div>
      <div className=" boder mb-5 flex gap-2 self-center border border-gray-500">
        <ChevronLeft className="h-7 w-7 cursor-pointer hover:bg-gray-600 hover:fill-white" />
        <h1>1</h1>
        <ChevronRight className="hover:fill-white0 h-7 w-7 cursor-pointer hover:bg-gray-600" />
      </div>

      <button
        onClick={() => setIsAddReview((prev) => !prev)}
        className={`mb-10 h-10 w-48 self-center rounded-md bg-sky-600 text-white hover:bg-sky-500 ${
          isAddReview && "hidden"
        }`}
      >
        Write Review
      </button>
      {isAddReview && (
        <ReviewForm
          productId={productId}
          setProductReviews={setProductReviews}
          setIsAddReview={setIsAddReview}
        />
      )}
    </section>
  );
}

export default ProductReview;
