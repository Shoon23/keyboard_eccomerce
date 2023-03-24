import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import product from "../assets";
import { usePageRef } from "../hooks/usePageRef";
import PersonalInfo from "../components/Profile/PersonalInfo";
import Favorites from "../components/Profile/Favorites";
import { apiPrivate } from "../utils/axiosBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useInterceptors } from "../hooks/useInterceptors";

function Profile() {
  const { firstName, lastName, email, accessToken, clearUserDetails } =
    useAuthStore();
  const axios = apiPrivate(accessToken as string);
  const api = useInterceptors(axios, accessToken as string);
  const { pageRef } = usePageRef();
  const [isShow, setIsShow] = useState<number>(1);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await api.get("/auth/logout");
      clearUserDetails();
      navigate("/");
    } catch (error) {}
  };

  return (
    <main
      ref={pageRef}
      className="flex min-h-screen flex-col place-items-center items-stretch gap-3 p-3 md:p-20"
    >
      <div className="flex justify-between text-white">
        <h1 className=" md:text-3xl">My Account</h1>
        <button
          onClick={handleLogOut}
          className="w-24 rounded-md bg-yellow-500 hover:bg-yellow-400"
        >
          Signout
        </button>
      </div>
      <section className="flex h-[660px] flex-col gap-10 md:h-96 md:flex-row">
        <aside className="flex flex-col place-items-center bg-white p-10 md:w-1/3 md:py-20">
          <h1 className="text-2xl">{firstName + " " + lastName}</h1>
          <h3 className="text-sm text-gray-400">{email}</h3>
          <div className="mt-3 flex flex-col">
            <ul>
              <li
                onClick={() => setIsShow(1)}
                className={`cursor-pointer text-lg ${
                  isShow === 1 && "text-sky-500"
                }`}
              >
                Personal Information
              </li>
              <li
                onClick={() => setIsShow(2)}
                className={`cursor-pointer text-lg ${
                  isShow === 2 && "text-sky-500"
                }`}
              >
                Favorites
              </li>
            </ul>
          </div>
        </aside>
        {isShow === 1 ? (
          <PersonalInfo
            firstName={firstName}
            lastName={lastName}
            email={email}
          />
        ) : (
          <Favorites />
        )}
      </section>
    </main>
  );
}

export default Profile;
