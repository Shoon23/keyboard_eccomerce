import React, { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { Outlet, useLocation } from "react-router-dom";
import { useRefreshToken } from "../hooks/useRefreshToken";
import Loading from "../components/Loading";

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

  return isLoading ? (
    <Loading isWhite={true} isSpinnerBlue={true} />
  ) : (
    <Outlet />
  );
}

export default PersistAuth;
