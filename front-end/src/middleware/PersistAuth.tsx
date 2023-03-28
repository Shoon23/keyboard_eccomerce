import React, { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import {
  Navigate,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useRefreshToken } from "../hooks/useRefreshToken";

function PersistAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const location = useLocation();
  const pathname = location?.state?.prevPath || "/";

  const addUserDetails = useAuthStore((state) => state.addUserDetails);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      const data = await useRefreshToken();
      addUserDetails(data);
      setIsLoading(false);
    };
    accessToken ? setIsLoading(false) : verifyToken();
  }, []);

  return isLoading ? <div className="">Loading...</div> : <Outlet />;
}

export default PersistAuth;
