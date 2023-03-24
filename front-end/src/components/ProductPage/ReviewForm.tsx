import { isAxiosError } from "axios";
import React, { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";
import useAuthStore from "../../store/authStore";
import StarList from "./StarList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { iProductReview } from "../../types";
import { api, apiPrivate } from "../../utils/axiosBase";
import { useInterceptors } from "../../hooks/useInterceptors";
import { useNavigate } from "react-router-dom";
interface Props {
  setIsAddReview: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
  setProductReviews: React.Dispatch<React.SetStateAction<iProductReview[]>>;
}

function ReviewForm({ setIsAddReview, productId, setProductReviews }: Props) {
  const { userId, clearUserDetails, accessToken, firstName, lastName } =
    useAuthStore();
  const axios = apiPrivate(accessToken as string);
  const api = useInterceptors(axios, accessToken as string);
  const navigate = useNavigate();
  const star = [1, 2, 3, 4, 5];
  const [error, setError] = useState<{ message: string }>({
    message: "",
  });
  const [starFill, setStarFill] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const handleStarFill = (numStar: number) => {
    setStarFill(numStar);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!starFill) {
      setError({
        message: "Please Add Star Rating",
      });
      return;
    }
    const formData = {
      reviewStar: starFill,
      reviewDescription: description,
      productId,
      userId,
    };

    try {
      const res = await api.post("/user/review/new", formData);

      setProductReviews((prev) => [
        ...prev,
        { ...res.data, user: { userId, firstName, lastName } },
      ]);

      toast.success("Cart Item Remove", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsAddReview(false);
    } catch (error) {
      if (isAxiosError(error)) {
        clearUserDetails();
        navigate("/login");
      } else {
        toast.warn("Something Went Wrong Please Try Again", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAddReview(false);
  };
  return (
    <div className="border border-black p-10 text-slate-500">
      <h1 className="mb-8 text-center text-3xl text-black">Review</h1>
      <h3>{error.message}</h3>
      <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-xl font-bold">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="h-20 resize-none border border-gray-500 outline-sky-500"
            placeholder="Write a Review"
            name=""
            value={description}
            id=""
          ></textarea>
        </div>
        <div className="flex self-center">
          {star.map((num: number) => {
            if (num <= starFill) {
              return (
                <StarFill
                  key={num}
                  size={38}
                  className="cursor-pointer fill-sky-500"
                  onClick={() => handleStarFill(num)}
                />
              );
            } else {
              return (
                <Star
                  key={num}
                  size={38}
                  className="cursor-pointer fill-sky-500"
                  onClick={() => handleStarFill(num)}
                />
              );
            }
          })}
        </div>
        <div className="mt-1 flex flex-col gap-1 self-center md:flex-row">
          <button
            onClick={handleCancel}
            className={`h-10 w-48  rounded-md bg-red-600 text-white hover:bg-red-500`}
          >
            Cancel
          </button>
          <button
            className={`h-10 w-48  rounded-md bg-sky-600 text-white hover:bg-sky-500`}
          >
            Submit
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default ReviewForm;
