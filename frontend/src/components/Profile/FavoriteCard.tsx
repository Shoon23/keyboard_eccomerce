import React from "react";
import { X } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { iFavorite } from "../../types";

import useAuthStore from "../../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAxiosError } from "axios";
import { usePrivateApi } from "../../hooks/usePrivateApi";

interface Props {
  favorite: iFavorite;
  setFavorites: React.Dispatch<React.SetStateAction<iFavorite[]>>;
}

function FavoriteCard({ favorite, setFavorites }: Props) {
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const clearUserDetails = useAuthStore((state) => state.clearUserDetails);
  const api = usePrivateApi(accessToken, false);
  const navigate = useNavigate();

  const handleRemoveFavorites = async () => {
    try {
      await api.delete(`/user/favorites/delete/${favorite.favoriteItemId}`);
      setFavorites((prevList) => {
        return prevList.filter(
          (prevaVal) => prevaVal.favoriteItemId !== favorite.favoriteItemId
        );
      });
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
    <div className="flex place-items-center gap-10 border-b border-black p-1 hover:bg-gray-300">
      <X
        onClick={handleRemoveFavorites}
        className="h-7 w-7 cursor-pointer fill-red-500"
      />
      <Link
        to={`/product/${favorite.productId}`}
        className="mr-2 h-24 w-24 cursor-pointer"
      >
        <img
          src={favorite.product.productImg[0].imgUrl}
          className="cursor-pointer"
          alt="das"
        />
      </Link>
      <div className="flex w-3/5 justify-between">
        <div className="flex place-items-center gap-4">
          <h1 className="text-xl">{favorite.product.productName}</h1>
          <h3 className="text-base text-gray-600">
            $ {favorite.product.productPrice}
          </h3>
        </div>
      </div>

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

export default FavoriteCard;
