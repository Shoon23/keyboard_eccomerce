import { useEffect, useState } from "react";
import { usePageRef } from "../hooks/usePageRef";
import { apiPrivate } from "../utils/axiosBase";
import { useInterceptors } from "../hooks/useInterceptors";
import useAuthStore from "../store/authStore";
import useAdminStore from "../store/adminStore";
import { iCheckOut } from "../types";
import { Search } from "react-bootstrap-icons";
import OrdersTable from "../components/Admin/OrdersTable";
import Navbar from "../components/Admin/Navbar";

function Admin() {
  const accessToken = useAuthStore((state) => state.accessToken) as string;
  const { setOrders, orders } = useAdminStore();
  const axios = apiPrivate(accessToken);
  const api = useInterceptors(axios, accessToken);

  const getCheckOuts = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
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
    </main>
  );
}

export default Admin;
