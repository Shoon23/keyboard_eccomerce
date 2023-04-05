import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageRef } from "../hooks/usePageRef";
import { useForm } from "react-hook-form";
import { iLogin } from "../types";
import useAuthStore from "../store/authStore";
import { api } from "../utils/axiosBase";
import { isAxiosError } from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const { pageRef } = usePageRef();
  const addUserDetails = useAuthStore((state) => state.addUserDetails);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.state?.prevPath || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iLogin>();

  const onSubmit = async (formData: iLogin) => {
    try {
      const res = await api.post("/auth/login", formData);
      addUserDetails(res.data);

      navigate(pathname);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };

  return (
    <main
      ref={pageRef}
      className="flex min-h-[550px] place-items-center justify-center  gap-10 bg-white"
    >
      <section className=" w-96 ">
        {error && (
          <h1 className="text-center text-3xl text-red-500">{error}</h1>
        )}
        <h1 className="text-center text-2xl">Login</h1>
        <form
          action=""
          className="flex flex-col p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label className="text-xl">Email</label>
            <input
              {...register("email", { required: "This is Required" })}
              type="email"
              className={`h-10  border-2 border-gray-500 ${
                errors.email?.message && `border-red-500`
              }`}
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col">
            <label className="text-xl">Password</label>
            <input
              {...register("password", { required: "This is Required" })}
              type="password"
              className={`h-10  border-2 border-gray-500 ${
                errors.email?.message && `border-red-500`
              }`}
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>
          <button className="mt-8 h-12 w-32 bg-sky-600 text-white hover:bg-sky-700">
            Login
          </button>
          <div className="mt-2 text-sm">
            New customer?
            <Link to={"/register"} className="text-sky-600 underline">
              Create acount
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
