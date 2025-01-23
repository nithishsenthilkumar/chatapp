import React, { useState, useEffect } from "react";
import Profile from "../Components/Profile";
import Chat from "../Components/Chat";
import axios from "axios";
import {
  BsPersonCircle,
  BsPeopleFill,
  BsFillChatLeftFill,
  BsTools,
  BsTelephoneFill,
  BsPersonFill,
} from "react-icons/bs";
import { useLocation } from "react-router-dom";
import MobileNav from "../Components/MobileNav";

export default function Home() {
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isGroupVisible, setGroupVisible] = useState(false);
  const [isFriendsVisible, setFriendVisible] = useState(true);
  const [isCallVisible, setCallVisible] = useState(false);
  const [isToolVisible, setToolVisible] = useState(false);
  const [isChatActive, setChatActive] = useState(false);
  const location = useLocation();
  const [isMobile, setMobile] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friends, setFriends] = useState([]);
  const token = location.state ? location.state.token : null;
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const [response, response1] = await Promise.all([
        axios.post("http://localhost:5000/addfriendtouser", formData, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.post("http://localhost:5000/AddFriendtoMessage", formData, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      fetchFriends();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const toggleFriends = () => {
    setFriendVisible(true);
    setCallVisible(false);
    setSelectedFriend(null);
    setGroupVisible(false);
    setToolVisible(false);
    setProfileVisible(false);
    setChatActive(false);
  };

  const toggleProfile = () => {
    setProfileVisible(true);
    setCallVisible(false);
    setSelectedFriend(null);
    setGroupVisible(false);
    setToolVisible(false);
    setFriendVisible(false);
    setChatActive(false);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    setChatActive(true);
  };

  useEffect(() => {
    function checkScreenSize() {
      setMobile(window.innerWidth<500);
    }
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    fetchFriends();
  }, [token]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get("http://localhost:5000/displayfriends", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriends(response.data.friends);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="conatiner-fluid h-screen">
      <div className="h-screen flex flex-col">
        {isProfileVisible ? (
          <Profile />
        ) : selectedFriend ? (
          <Chat
            name={selectedFriend.name}
            mobile={selectedFriend.mobile}
            onBack={toggleFriends}
          />
        ) : (
          <div className="flex-grow bg-[#E0B0FF] overflow-y-auto">
            <div className="flex flex-col justify-center mt-7 items-start">
              {friends.map((friend, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectFriend(friend)}
                  className="py-2 flex justify-center w-full"
                >
                  <div className="flex justify-start items-center bg-[#FFF0F5] py-2 px-4 rounded-lg w-11/12 animate__animated animate__fadeInUp">
                    <div>
                      <BsPersonCircle className="text-3xl" />
                    </div>
                    <div className="ml-4">
                      {friend.name && (
                        <div>
                          <h2 className="font-bold text-xl">{friend.name}</h2>
                        </div>
                      )}
                      <div>
                        <h2 className="font-semibold text-lg">
                          {friend.mobile}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>{isMobile ? <MobileNav /> : console.log("above mobile screen")}</div>
    </div>
  );
}
