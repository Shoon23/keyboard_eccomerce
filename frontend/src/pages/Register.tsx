import { useState } from "react";
import { isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { usePageRef } from "../hooks/usePageRef";
import { api } from "../utils/axiosBase";
import useAuthStore from "../store/authStore";
import { iRegister } from "../types";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<iRegister>();

  const addUserDetails = useAuthStore((state) => state.addUserDetails);
  const { pageRef } = usePageRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: iRegister) => {
    const { confirmPassword, ...formData } = data;
    setError("");
    try {
      const res = await api.post("/auth/register", formData);
      addUserDetails(res.data);
      navigate("/");
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
        <h1 className="text-center text-2xl">Create an account</h1>
        <form
          action=""
          className="flex flex-col p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* First Name Start */}
          <div className="flex flex-col">
            <label className="text-xl">First Name</label>
            <input
              {...register("firstName", { required: "This is required" })}
              type="text"
              className={`h-10 border-2 border-gray-500 ${
                errors.firstName?.message && `border-red-500`
              }`}
            />
            <p className="text-sm text-red-500">{errors.firstName?.message}</p>
          </div>
          {/* First Name End */}

          {/* Last Name Start */}
          <div className="flex flex-col">
            <label className="text-xl">Last Name</label>
            <input
              {...register("lastName", { required: "This is required" })}
              type="text"
              className={`h-10 border-2 border-gray-500 ${
                errors.lastName?.message && `border-red-500`
              }`}
            />
            <p className="text-sm text-red-500">{errors.lastName?.message}</p>
          </div>
          {/* Last Name End */}

          {/* Email Start */}
          <div className="flex flex-col">
            <label className="text-xl">Email</label>
            <input
              {...register("email", { required: "This is required" })}
              type="email"
              className={`h-10 border-2 border-gray-500 ${
                errors.email?.message && `border-red-500`
              }`}
            />
            <p className="text-sm text-red-500">{errors.email?.message}</p>
          </div>
          {/* Email End */}

          {/* Password Start */}

          <div className="flex flex-col">
            <label className="text-xl">Password</label>
            <input
              {...register("password", {
                required: "This is Required",
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters",
                },
              })}
              type="password"
              className={`h-10 border-2 border-gray-500 ${
                errors.password?.message && `border-red-500`
              }`}
            />
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          </div>
          {/* Password End */}

          {/*Confirm Password Start */}

          <div className="flex flex-col">
            <label className="text-xl">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Password is missing",
                validate: {
                  passwordEqual: (value) =>
                    value === getValues().password || "Password not matched",
                },
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters",
                },
              })}
              type="password"
              className={`h-10 border-2 border-gray-500 ${
                errors.confirmPassword?.message && `border-red-500`
              }`}
            />
            <p className="text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>
          </div>
          {/*Confirm Password End */}

          <button
            type="submit"
            className="mt-8 h-12 w-32 bg-sky-600 text-white hover:bg-sky-700"
          >
            Register
          </button>
          <div className="mt-2 text-sm">
            returning customer ?
            <Link to={"/login"} className="text-sky-600 underline">
              Sign in
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
