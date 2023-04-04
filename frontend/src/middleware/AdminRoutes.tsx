import React from "react";
import useAuthStore from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";
import { usePageRef } from "../hooks/usePageRef";

function AdminRoutes() {
  const { pageRef } = usePageRef();

  const isAdmin = useAuthStore((state) => state.isAdmin);
  return isAdmin ? <Outlet context={{ pageRef }} /> : <Navigate to={"/"} />;
}

export default AdminRoutes;
