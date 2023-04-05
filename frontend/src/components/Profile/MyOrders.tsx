import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../../store/authStore";
import { usePrivateApi } from "../../hooks/usePrivateApi";

function MyOrders() {
  const userId = useAuthStore((state) => state.userId);
  const checkOutId = useAuthStore((state) => state.checkOutId);
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const api = usePrivateApi(accessToken, false);
  const [checkouts, setCheckOuts] = useState<any[]>([]);

  const getOrders = async () => {
    try {
      const res = await api.get(`/user/myorders/${checkOutId}`);
      setCheckOuts(res.data);
    } catch (error) {
      toast.warn("Something Went Wrong Please Reload The Page", {
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
                  Delivery Status:
                  <span className="text-black"> {orders.status}</span>
                </h1>
                <h1 className="text-gray-500">
                  Total:
                  <span className="text-yellow-500"> P {orders.amount}</span>
                </h1>
              </div>
            </div>

            {orders?.orderItems?.map((orderDetails: any) => (
              <div
                key={orderDetails.orderItemId}
                className="mb-1 flex gap-10 hover:bg-gray-200"
              >
                <img
                  src={orderDetails.product.productImg[0].imgUrl || ""}
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
    </section>
  );
}

export default MyOrders;
