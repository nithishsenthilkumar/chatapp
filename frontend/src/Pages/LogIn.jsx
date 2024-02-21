import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsShieldFillCheck } from "react-icons/bs";
import background from "../Asserts/background3.jpg";
import BlobsComponent from "../Loaders/BlobsComponent";

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const navigatetoHome = (token) => {
    history("/home", { state: { token } });
  };

  const navigatetoSignup = () => {
    history("/signup");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      const token = response.data.token;
      navigatetoHome(token);
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
        <div className="border-2 border-white p-8 rounded-xl animate__animated animate__zoomIn">
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
                  name="email"
                  onChange={handleChange}
                  placeholder="E-Mail"
                  className="border-2 border-white font-semibold tracking-wider text-ls bg-transparent p-2 pl-7 rounded-lg mt-4"
                />
                <div className="absolute inset-y-0 left-0 pl-2 pt-4 flex items-center pointer-events-none">
                  <MdOutlineAlternateEmail className="text-white" />
                </div>
              </div>

              <div className="relative items-center">
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="border-2 border-white font-semibold tracking-wider text-ls bg-transparent p-2 rounded-lg mt-4 pl-7"
                />
                <div className="absolute inset-y-0 left-0 pl-2 pt-4 flex items-center pointer-events-none">
                  <BsShieldFillCheck />
                </div>
              </div>

              <div className="mt-3 flex items-center">
                <input type="checkbox" />
                <label className="ml-2">Remember me</label>
              </div>

              <button
                type="submit"
                className="bg-[#b2dbd5] font-bold text-black tracking-widest text-lg border-2 border-white p-2 mt-4 rounded-lg hover:bg-[#337bae]"
              >
                Login
              </button>
            </form>

            <label className="mt-4 flex items-center">
              Don't have an account?&nbsp;&nbsp;
              <span
                onClick={navigatetoSignup}
                className="cursor-pointer text-blue-500"
              >
                Sign up
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
