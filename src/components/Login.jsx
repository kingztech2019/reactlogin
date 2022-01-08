import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "react-simple-snackbar";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const options = {
    position: "bottom-right",
    style: {
      backgroundColor: "gray",
      border: "2px solid lightgreen",
      color: "white",
      fontFamily: "Menlo, monospace",
      fontSize: "20px",
      textAlign: "center",
    },
    closeStyle: {
      color: "lightcoral",
      fontSize: "16px",
    },
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(options);
  const onSubmit = (data) => {
    setLoading(true);
    const body = {
      ...data,
      //phone: parseInt(data.phone),
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login`,
        { ...body },
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        // handle success
        setLoading(false);
        setMessage(response?.data?.message);
        openSnackbar(response?.data?.message);
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        navigate("/");
        //console.log(response?.data?.message);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        setMessage(error?.response?.data?.message);
        openSnackbar(error?.response?.data?.message);
        //console.log(error?.response?.data?.message);
      })
      .then(function () {
        // always executed
      });

    console.log(data);
  };
  return (
    <div className="bg-gradient-to-r min-h-screen lg:min-h-screen  from-cyan-500 to-blue-500">
      <div className="flex justify-center py-10 ">
        <div className="bg-white w-96 h-auto border border-gray-200 rounded-md">
          <h1 className="text-center pt-4 text-[#0c2650] text-lg font-bold">
            Login
          </h1>
          {message && (
            <div className="px-11 py-4">
              <div className="font-bold bg-gradient-to-r from-fuchsia-400 via-sky-400 to-violet-200 p-4  text-center text-white ">
                {message}
              </div>
            </div>
          )}

          <div className="pl-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pt-6 text-sm">Email:</div>
              <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="email"
                  name="email"
                  className="py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-10/12 focus:bg-white focus:text-gray-900"
                  placeholder="Enter your Email Address"
                  autoComplete="on"
                  {...register("email", {
                    required: true,
                  })}
                />
                <div>
                  {errors.email && errors.email.type === "required" && (
                    <span
                      role="alert"
                      className="text-red-600 text-[10px] italic"
                    >
                      Email is required
                    </span>
                  )}
                </div>
              </div>
              <div className="pt-6 text-sm">Password:</div>
              <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-outline"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      class="w-4 h-4"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </span>
                <input
                  type="password"
                  name="password"
                  className="py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-10/12 focus:bg-white focus:text-gray-900"
                  placeholder="Enter your password"
                  autoComplete="on"
                  {...register("password", {
                    required: true,
                  })}
                />
                <div>
                  {errors.password && errors.password.type === "required" && (
                    <span
                      role="alert"
                      className="text-red-600 text-[10px] italic"
                    >
                      Password is required
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right p-3 text-[#0c2650] text-sm">
                Forget Password?
              </div>
              <div className="py-6 px-6">
                <button
                  className={`w-full ${
                    loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700 "
                  } text-white font-bold py-2 px-4 rounded`}
                  disabled={loading ? true : false}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
                <div className="text-center text-sm pt-1">
                  Create an account? <Link to="/register">Sign Up</Link>
                </div>
              </div>
            </form>
            {/* <div class="flex justify-center items-center">
              <div
                class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
