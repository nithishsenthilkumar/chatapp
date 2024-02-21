import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../Asserts/background2.jpg";
import { BsPersonFill, BsShieldFillCheck } from "react-icons/bs";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import BlobsComponent from "../Loaders/BlobsComponent";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
  });

  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  const navigatetoLogin = () => {
    history("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        formData
      );
      navigatetoLogin();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div
      className="container-fluid bg-cover bg-no-repeat text-white h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${background}) ` }}
    >
      {loading ? (
        <BlobsComponent />
      ) : (
        <div className="border-2 border-white p-10 rounded-xl animate__animated animate__zoomIn">
          <div>
            <h1 className="font-bold text-xl tracking-widest mb-4">
              Get Started
            </h1>
          </div>

          <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="relative items-center">
                <input
                  type="text"
                  name="username"
                  className="border-2 border-white font-semibold tracking-wider text-ls bg-transparent p-2 pl-7 rounded-lg mt-4"
                  onChange={handleChange}
                  placeholder="Username"
                />
                <div className="absolute inset-y-0 left-0 pl-2 pt-3 flex items-center pointer-events-none">
                  <BsPersonFill />
                </div>
              </div>

              <div className="relative items-center">
                <input
                  type="text"
                  name="email"
                  className="border-2 border-white font-semibold tracking-wider text-ls bg-transparent p-2 pl-7 rounded-lg mt-4"
                  onChange={handleChange}
                  placeholder="E-Mail"
                />
                <div className="absolute inset-y-0 left-0 pl-2 pt-4 flex items-center pointer-events-none">
                  <MdOutlineAlternateEmail className="text-white" />
                </div>
              </div>

              <div className="relative items-center">
                <input
                  type="text"
                  name="phonenumber"
                  className="border-2 border-white font-semibold tracking-wider text-ls bg-transparent p-2 pl-7 rounded-lg mt-4"
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
                <div className="absolute inset-y-0 left-0 pl-2 pt-4 flex items-center pointer-events-none">
                  <FaPhone />
                </div>
              </div>

              <div className="relative items-center">
                <input
                  type="password"
                  name="password"
                  className="border-2 border-white font-semibold tracking-wider text-ls bg-transparent p-2 pl-7 rounded-lg mt-4"
                  onChange={handleChange}
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 left-0 pl-2 pt-4 flex items-center pointer-events-none">
                  <BsShieldFillCheck />
                </div>
              </div>

              <div className="relative items-center">
                <input
                  type="password"
                  name="confirmpassword"
                  className="border-2 border-white font-semibold tracking-wider text-ls bg-transparent p-2 pl-7 rounded-lg mt-4"
                  onChange={handleChange}
                  placeholder="Re-Enter Password"
                />
                <div className="absolute inset-y-0 left-0 pl-2 pt-4 flex items-center pointer-events-none">
                  <BsShieldFillCheck />
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#b2dbd5] font-bold text-black tracking-widest text-lg border-2 border-white p-2 mt-4 rounded-lg hover:bg-[#337bae]"
              >
                Sign Up
              </button>
            </form>

            <label className="mt-4 flex items-center">
              Already have an account?&nbsp;&nbsp;
              <span
                onClick={navigatetoLogin}
                className="cursor-pointer text-blue-500"
              >
                Login
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
