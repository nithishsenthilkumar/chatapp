import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { TiAttachmentOutline } from "react-icons/ti";
import {
  BsArrowLeftShort,
  BsTelephoneFill,
  BsPersonCircle,
  BsFillCameraVideoFill,
  BsThreeDotsVertical,
  BsFillCursorFill,
  BsCameraFill,
} from "react-icons/bs";

const Chat = ({ name, mobile, onBack }) => {
  const location = useLocation();
  const token = location.state ? location.state.token : null;
  const [sentmessage, setSentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    const interval = setInterval(fetchMessage, 200);
    return () => clearInterval(interval);
  }, [mobile, token]);

  const fetchMessage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/displaymessages?mobile=${mobile}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.messages || []);
      setId(response.data.userId);
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleChange = (e) => {
    setSentMessage(e.target.value);
  };

  const groupedMessages = messages.reduce((acc, message) => {
    const messageDate = new Date(message.timestamp).toISOString().split("T")[0];
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    return acc;
  }, {});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${day} ${month} ${year}`;
  };

  const handleBack = () => {
    onBack();
  };

  const handleSubmit = async () => {
    if (!sentmessage.trim()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/addmessage",
        {
          mobile: mobile,
          text: sentmessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMessage();
      setSentMessage("");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="h-screen bg-[#E0B0FF] flex flex-col">
      <div className="fixed top-0 left-0 right-0 bg-[#FFF0F5] py-2 px-4 flex items-center justify-between z-10">
        <div className="flex items-center">
          <button onClick={handleBack}>
            <BsArrowLeftShort className="text-3xl" />
          </button>
          <div className="ml-4">
            <h2 className="font-bold text-lg">{name}</h2>
            <h3 className="font-semibold text-md">{mobile}</h3>
          </div>
        </div>
        <div className="flex space-x-4 items-center">
          <BsTelephoneFill className="text-2xl" />
          <BsFillCameraVideoFill className="text-2xl" />
          <BsThreeDotsVertical className="text-2xl" />
        </div>
      </div>

      <div className="flex flex-col bg-[#E0B0FF] px-4 py-2 mt-20 space-y-4 flex-1 overflow-y-scroll">
        {Object.entries(groupedMessages).map(([date, messages], index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center justify-center mb-2">
              <h4 className="font-bold text-md text-center bg-[#B57EDC] rounded-lg py-1 px-2">
                {formatDate(date)}
              </h4>
            </div>
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`message flex pb-3 ${
                  message.senderId === id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.senderId === id ? "bg-[#FAE6FA]" : "bg-[#CCCCFF]"
                  } rounded-lg p-2 max-w-[70%]`}
                >
                  <div className="flex items-end">
                    <h2 className="font-semibold text-sm">{message.content}</h2>
                    <h4 className="text-xs ml-2">
                      {new Date(message.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-[#E0B0FF] py-2 px-4">
        <div className="flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter the message"
              value={sentmessage}
              onChange={handleChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className="w-full pr-14 py-2 rounded-lg pl-10"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <BsCameraFill className="mr-3 text-xl" />
              <TiAttachmentOutline className="text-xl" />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="p-3 ml-4 bg-black text-white rounded-full"
          >
            <BsFillCursorFill className="transform rotate-45 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
