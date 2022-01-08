import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const logOut = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(function (response) {
        // handle success
        setLoading(false);
        //   setMessage(response?.data?.message);
        //   openSnackbar(response?.data?.message);
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        //   setMessage(error?.response?.data?.message);
        //   openSnackbar(error?.response?.data?.message);
        //console.log(error?.response?.data?.message);
      })
      .then(function () {
        // always executed
      });
  };
  useEffect(() => {
    const User = localStorage.getItem("user");
    const parseUser = JSON.parse(User);
    setUserData(User);
  }, [userData]);
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          Golang Blog
        </span>
      </div>

      <label
        className="block lg:hidden cursor-pointer flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        for="menu-toggle"
      >
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        id="menu"
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="/"
            className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Home
          </a>
          <a
            href="/create"
            className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Create Post
          </a>
          {!userData && (
            <a
              href="/register"
              className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Register
            </a>
          )}
          <a
            href="/personal"
            className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            My Post
          </a>
          <div
            onClick={logOut}
            className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer"
          >
            {userData ? " Log Out" : "Login"}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
