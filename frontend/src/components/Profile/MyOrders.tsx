import React, { useEffect, useState } from "react";
import productImg from "../../assets";
import { apiPrivate } from "../../utils/axiosBase";
import { useInterceptors } from "../../hooks/useInterceptors";
import useAuthStore from "../../store/authStore";

function MyOrders() {
  const userId = useAuthStore((state) => state.userId);
  const checkOutId = useAuthStore((state) => state.checkOutId);
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const axios = apiPrivate(accessToken);
  const api = useInterceptors(axios, accessToken);
  const [checkouts, setCheckOuts] = useState<any[]>([]);

  const getOrders = async () => {
    try {
      const res = await api.get(`/user/myorders/${checkOutId}`);
      console.log(res);
      setCheckOuts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <section>
      <div className=" h-[500px] overflow-y-scroll bg-sky-600 md:w-96 lg:w-[830px]">
        {checkouts.map((orders: any, idx: number) => (
          <div
            key={orders.ordersId}
            className="mb-2 flex flex-col border border-black bg-white"
          >
            <div className="my-1 flex justify-between border border-b px-5">
              <h1>Order #{idx + 1}</h1>
              <div className="">
                <h1 className="text-gray-500">
                  Delivery Status: {orders.status}
                  <span className="text-black"> Preparing</span>
                </h1>
                <h1 className="text-gray-500">
                  Total:{" "}
                  <span className="text-yellow-500"> P {orders.amount}</span>
                </h1>
              </div>
            </div>

            {orders?.orders?.map((orderDetails: any) => (
              <div
                key={orderDetails.orderItemId}
                className="mb-1 flex gap-10 hover:bg-gray-200"
              >
                <img
                  src={productImg.productImg1}
                  alt=""
                  className="h-24 w-24"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex place-items-center gap-2">
                    <h1>Keyboard 1</h1>
                    <h4 className="text-sm text-gray-400">
                      Quantity:{" "}
                      <span className="text-black">
                        {orderDetails.quantity}
                      </span>
                    </h4>
                    <h4 className="text-sm text-yellow-500">
                      P {Number(orderDetails.price) * orderDetails.quantity}
                    </h4>
                  </div>
                  <div className="">
                    <p>Ship to:</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyOrders;
