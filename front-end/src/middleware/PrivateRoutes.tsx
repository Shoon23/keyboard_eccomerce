import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { usePageRef } from "../hooks/usePageRef";

function PrivateRoutes() {
  const location = useLocation();
  const { pageRef } = usePageRef();
  const userId = useAuthStore((state) => state.userId);

  return userId ? (
    <Outlet context={{ pageRef }} />
  ) : (
    <Navigate to={"/login"} state={{ prevPath: location.pathname }} replace />
  );
}

export default PrivateRoutes;
