import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import product from "../assets";
import CartCard from "../components/Cart/CartCard";
import { apiPrivate } from "../utils/axiosBase";
import { usePageRef } from "../hooks/usePageRef";
import { useInterceptors } from "../hooks/useInterceptors";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

function Cart() {
  const cartId = useAuthStore((state) => state.cartId);
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const clearUserDetails = useAuthStore((state) => state.clearUserDetails);

  const navitage = useNavigate();
  const { pageRef } = usePageRef();

  const axios = apiPrivate(accessToken);
  const api = useInterceptors(axios, accessToken);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<any>([]);
  const [price, setPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${cartId}`);
      setPrice(res.data.totalPrice);
      setCart(res.data.cartItem);
    } catch (error) {
      clearUserDetails();
      navitage("/login");
    }
  };

  useEffect(() => {
    fetchCart();
    setIsLoading(false);
  }, []);

  return (
    <main ref={pageRef} className="bg-white">
      <section className="flex flex-col gap-2 p-3 md:p-20">
        <h1 className="text-2xl font-thin">Your Cart</h1>
        <div
          className={`h-[500px] overflow-y-scroll border-2 border-black ${
            cart.length === 0 && `flex place-content-center place-items-center`
          }`}
        >
          {cart.length === 0 ? (
            <h1 className="text-xl text-gray-500">Your Cart is Empty</h1>
          ) : (
            <>
              {cart.map((cartItem: any) => {
                return (
                  <CartCard
                    setPrice={setPrice}
                    setCart={setCart}
                    cartItem={cartItem}
                    key={cartItem.cartItemId}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="h-50 flex w-full flex-col place-items-end gap-2 bg-gray-200 p-4">
          <div className="flex place-items-center gap-5">
            <div className="flex gap-2">
              <h1 className="text-gray-600">Total Items:</h1>
              <h2 className="text-xl font-black">{cart.length}</h2>
            </div>
            <div className="flex gap-2">
              <h1 className="text-gray-600">Total:</h1>
              <h2 className="text-xl font-black">${price}</h2>
            </div>
          </div>
          <button className="mb-5 h-10 w-36 self-end rounded-md bg-sky-600 text-white hover:bg-sky-500">
            Check Out
          </button>
        </div>
      </section>
    </main>
  );
}

export default Cart;
