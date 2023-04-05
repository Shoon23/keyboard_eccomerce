import { useEffect, useState } from "react";
import { usePageRef } from "../hooks/usePageRef";

import useAuthStore from "../store/authStore";
import useAdminStore from "../store/adminStore";
import { iCheckOut } from "../types";
import { Search } from "react-bootstrap-icons";
import OrdersTable from "../components/Admin/OrdersTable";
import Navbar from "../components/Admin/Navbar";
import { usePrivateApi } from "../hooks/usePrivateApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const { setOrders, orders } = useAdminStore();
  const api = usePrivateApi(accessToken, false);
  const navigate = useNavigate();
  const getCheckOuts = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403 || error.response?.status === 401) {
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

  useEffect(() => {
    getCheckOuts();
  }, []);

  const { pageRef } = usePageRef();
  return (
    <main ref={pageRef}>
      <section className=" min-h-screen">
        <OrdersTable orders={orders} />;
      </section>
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
    </main>
  );
}

export default Admin;
