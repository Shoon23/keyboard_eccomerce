import { useState } from "react";
import useAuthStore from "../store/authStore";
import { api } from "../utils/axiosBase";

interface Props {
  cart: Array<{}>;
  price: number;
}

function Checkout({ cart, price }: Props) {
  const userId = useAuthStore((state) => state.userId);
  const email = useAuthStore((state) => state.email);
  const cartId = useAuthStore((state) => state.cartId);
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
    };

    try {
      const res = await api.post("stripe/create-checkout-session", formData);
      console.log(res);
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
    setIsCheckOut(false);
  };

  return (
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
  );
}

export default Checkout;
