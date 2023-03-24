import React, { useState } from "react";
import { Plus, Dash, X } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { apiPrivate } from "../../utils/axiosBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInterceptors } from "../../hooks/useInterceptors";
import { isAxiosError } from "axios";

interface Props {
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  cartItem: any;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

function CartCard({ cartItem, setCart, setPrice }: Props) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearUserDetails = useAuthStore((state) => state.clearUserDetails);
  const [quantity, setQuantity] = useState<any>(cartItem?.quantity);
  const axios = apiPrivate(accessToken as string);
  const api = useInterceptors(axios, accessToken as string);
  const navigate = useNavigate();

  const handleRemoveCartItem = async () => {
    try {
      await api.delete(`/cart/delete/${cartItem.cartItemId}`);
      setCart((prev) => {
        return prev.filter((item: any) => {
          return item.cartItemId !== cartItem.cartItemId;
        });
      });
      setPrice(
        (prev) => prev - cartItem?.product?.productPrice * cartItem?.quantity
      );
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
  const handleUpdateCartItem = async (quantity: number) => {
    const formData = { quantity, cartItemId: cartItem.cartItemId };

    try {
      await api.put("/cart/update", formData);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
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
    <>
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
      <div className="flex place-items-center border-b border-black p-1 hover:bg-gray-300">
        <X
          onClick={handleRemoveCartItem}
          className="h-7 w-7 cursor-pointer fill-red-500"
        />
        <Link
          to={`/product/${cartItem?.product?.productId}`}
          className="mr-2 h-24 w-24 cursor-pointer"
        >
          <img
            src={cartItem?.product?.productImg[0]?.imgUrl}
            className=""
            alt=""
          />
        </Link>
        <div className="flex w-3/5 justify-between">
          <div className="flex flex-col md:ml-10">
            <h1 className="text-xl">{cartItem?.product?.productName}</h1>
            <h3 className="text-base text-gray-600">
              $ {cartItem?.product?.productPrice}
            </h3>
          </div>
          <div className="flex gap-3 md:place-items-center ">
            <div className="flex h-16 w-7 flex-col place-items-center border border-gray-600 md:h-10 md:w-32 md:flex-row md:justify-center">
              <Plus
                onClick={() => {
                  if (quantity === cartItem.product?.productStock) return;
                  setQuantity((prev: any) => prev + 1);
                  handleUpdateCartItem(quantity + 1);
                }}
                className="h-4 w-4 cursor-pointer active:bg-gray-600 md:h-7 md:w-7"
              />

              <input
                disabled={true}
                value={quantity}
                type="number"
                className="w-full bg-gray-200 text-center md:w-20"
              />
              <Dash
                onClick={() => {
                  if (quantity === 1) return;
                  setQuantity((prev: any) => prev - 1);
                  handleUpdateCartItem(quantity - 1);
                }}
                className="h-4 w-4  cursor-pointer active:bg-gray-600 md:h-7 md:w-7"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center">
              <h1>Total:</h1>
              <h2>{cartItem?.product?.productPrice * cartItem?.quantity}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartCard;
