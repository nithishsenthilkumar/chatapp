import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import HomeComponent from "./Home";
import Chat from "../Components/Chat";

export default function () {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
