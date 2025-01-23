import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

const Profile = () => {
  const location = useLocation();
  const token = location.state ? location.state.token : null;
  const [userData, setUserData] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  useEffect(() => {
    if (token) {
      sendToken(token);
    }
  }, [token]);

  const sendToken = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/userdetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error(
        "Error sending token to backend:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-fluid h-screen bg-[#E0B0FF] flex justify-center items-center">
      {userData && (
        <div className="text-center flex flex-col justify-around items-around">
          <Typography variant="h4" color="blue-gray">
            {userData.username}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {userData.email}
          </Typography>
          <Typography color="blue-gray" className="font-medium" textGradient>
            {userData.mobile}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Profile;
