import React, { useState } from "react";
import product from "../../assets";
import { Heart, Cart, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { iProduct } from "../../types";
import StarList from "./StarList";
import useAuthStore from "../../store/authStore";
import { apiPrivate } from "../../utils/axiosBase";
import { useNavigate } from "react-router-dom";
import { useInterceptors } from "../../hooks/useInterceptors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAxiosError } from "axios";

interface Props {
  pageRef: (node?: Element | null | undefined) => void;
  productDetails: iProduct;
  totalReviews: number;
}

function ProductDetails({ pageRef, productDetails, totalReviews }: Props) {
  const cartId = useAuthStore((state) => state.cartId);
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const favoritesId = useAuthStore((state) => state.favoritesId);
  const clearUserDetails = useAuthStore((state) => state.clearUserDetails);

  const [quantity, setQuantity] = useState<number>(1);
  const [currImg, setCurrImg] = useState<number>(0);
  const axios = apiPrivate(accessToken);
  const api = useInterceptors(axios, accessToken);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!cartId) return navigate("/login");

    const formData = { cartId, productId: productDetails.productId, quantity };
    try {
      await api.post("/cart/add", formData);
      toast.success("Item Added to Cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
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
    }
  };
  const handleAddToFavorite = async () => {
    const formData = { favoritesId, productId: productDetails.productId };
    try {
      await api.post("/user/favorites/add", formData);
      toast.success("Item Added to Favorites", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
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
    }
  };
  return (
    <section
      ref={pageRef}
      className="flex min-h-screen flex-col bg-white lg:flex-row lg:place-items-center"
    >
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
      <div className="flex flex-col">
        <img src={productDetails.productImg[currImg]?.imgUrl} alt="" />
        <div className="flex pl-4">
          {productDetails?.productImg.map(
            (
              img: { imgUrl: string; productId: string; productImgId: string },
              idx: number
            ) => {
              return (
                <img
                  onClick={() => setCurrImg(idx)}
                  key={img.productImgId}
                  src={img.imgUrl}
                  className="h-20 w-20 cursor-pointer border border-gray-400"
                  alt=""
                />
              );
            }
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-2xl">{productDetails.productName}</h1>
        <div className="flex gap-1">
          <StarList startFill={5} size={25} color={"yellow"} />

          <p>{totalReviews}</p>
        </div>
        <h3 className="text-xl font-bold">₱ 299</h3>
        <p className="text-gray-500">{productDetails.productDescription}</p>
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="">Quantity</label>
          <div className="flex w-8 flex-col place-items-center border border-gray-600">
            <ChevronUp
              onClick={() => {
                if (quantity === productDetails.productStock) return;
                setQuantity((prev) => prev + 1);
              }}
              className="h-5 w-5 active:bg-gray-600 "
            />

            <input
              disabled={true}
              type="number"
              value={quantity}
              className="w-full bg-gray-200 text-center"
            />
            <ChevronDown
              onClick={() => {
                if (quantity === 1) return;
                setQuantity((prev) => prev - 1);
              }}
              className="h-5 w-5 active:bg-gray-600 "
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:w-full lg:flex-row-reverse">
          <button
            onClick={handleAddToCart}
            className="flex h-10 place-content-center gap-1 rounded-xl border-2 bg-sky-600 p-1  text-white hover:bg-sky-500 active:bg-sky-600 lg:w-2/4 "
          >
            Add To Cart <Cart className="h-7 w-7" />
          </button>
          <button
            onClick={handleAddToFavorite}
            className="flex  h-9 place-content-center gap-1 rounded-xl border-2  border-red-500 p-1 text-red-500 hover:bg-red-500 hover:text-white lg:w-2/4"
          >
            Favorite <Heart className="h-7 w-7" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
