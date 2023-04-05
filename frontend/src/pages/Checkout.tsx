import { useState } from "react";
import useAuthStore from "../store/authStore";
import { api } from "../utils/axiosBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  cart: Array<{}>;
  price: number;
}

function Checkout({ cart, price }: Props) {
  const userId = useAuthStore((state) => state.userId);
  const email = useAuthStore((state) => state.email);
  const cartId = useAuthStore((state) => state.cartId);
  const checkOutId = useAuthStore((state) => state.checkOutId);
  const navigate = useNavigate();

  const [isCheckOut, setIsCheckOut] = useState(false);
  const handleCheckOut = async () => {
    setIsCheckOut(true);
    const details = cart.map((item: any) => {
      return {
        price: item?.product?.productPriceId,
        quantity: item?.quantity,
        productId: item?.product?.productId,
        amount: item?.product?.productPrice * item?.quantity,
      };
    });

    const formData = {
      details,
      price,
      userId,
      email,
      cartId,
      checkOutId,
    };

    try {
      const res = await api.post("stripe/create-checkout-session", formData);
      window.location.href = res.data.url;
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
    setIsCheckOut(false);
  };

  return (
    <>
      <button
        disabled={cart.length === 0 || (isCheckOut && true)}
        onClick={handleCheckOut}
        className={
          isCheckOut || cart.length === 0
            ? "gray-sky-600 gray:bg-sky-500 mb-5 h-10 w-36 self-end rounded-md border border-black  text-black"
            : "mb-5 h-10 w-36 self-end rounded-md bg-sky-600 text-white hover:bg-sky-500"
        }
      >
        Check Out
      </button>
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
    </>
  );
}

export default Checkout;
