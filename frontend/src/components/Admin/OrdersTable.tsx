import React from "react";
import { iOrder } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuthStore from "../../store/authStore";
import { usePrivateApi } from "../../hooks/usePrivateApi";
import OrderCard from "./OrderCard";
interface Props {
  orders: iOrder[];
}

function OrdersTable({ orders }: Props) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const api = usePrivateApi(accessToken, false);

  const updateStatus = async (status: string, ordersId: string) => {
    try {
      const res = await api.put("/admin/order/status", { ordersId, status });
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
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Name</th>
            <th># of Items</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderCard
              order={order}
              key={order.ordersId}
              updateStatus={updateStatus}
            />
          ))}
        </tbody>
      </table>
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

export default OrdersTable;
