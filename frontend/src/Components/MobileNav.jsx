import React from "react";

const MobileNav = () => {
  return (
    <div className="navbar">
      <div className="fixed bottom-0 left-0 py-4 w-full flex justify-around items-center bg-[#800080] shadow-md py-2 rounded-t-xl">
        <button className="focus:outline-none" onClick={toggleProfile}>
          <BsPersonFill className="text-2xl text-white" />
        </button>
        <button className="focus:outline-none">
          <BsPeopleFill className="text-2xl text-white" />
        </button>
        <button className="focus:outline-none" onClick={toggleFriends}>
          <BsFillChatLeftFill className="text-2xl text-white" />
        </button>
        <button className="focus:outline-none">
          <BsTelephoneFill className="text-2xl text-white" />
        </button>
        <button className="focus:outline-none">
          <BsTools className="text-2xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
