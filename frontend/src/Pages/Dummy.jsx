<div>
      <div>
        <button onClick={toggleProfile}>
          <CgProfile />
        </button>
        {isProfileVisible && <Profile />}
        <button onClick={toggleDialog}>
          <CgMathPlus />
        </button>
        {isDialogVisible && (
          <div className="dialog">
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="name"
            />
            <input
              onChange={handleChange}
              name="mobile"
              type="text"
              placeholder="mobile number"
            />
            <button onClick={handleSubmit}>add to chat</button>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end items-end bg-blue-200 w-1/5">
        <h1 className="text-2xl font-bold">friendsss</h1>
        <ul>
          {friends.map((friend, index) => (
            <li key={index} onClick={() => handleSelectFriend(friend)}>
              {friend.name && (
                <span>
                  Name: {friend.name} <br />{" "}
                </span>
              )}
              Mobile: {friend.mobile}
            </li>
          ))}
        </ul>
      </div>
      {selectedFriend && (
        <Chat name={selectedFriend.name} mobile={selectedFriend.mobile} />
      )}
    </div>