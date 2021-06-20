import { Avatar } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

const SidebarChat = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          "https://morning-scrubland-01222.herokuapp.com/user?userId_username=" +
            friendId
        );
        setUser(res.data.data);
        //console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="sidebarChat">
      <div className="sidebarChat__info">
        <h2>{user.fullName}</h2>
      </div>
      <Avatar />
    </div>
  );
};

export default SidebarChat;
