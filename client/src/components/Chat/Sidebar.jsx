import React, { useEffect, useState } from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import "./Sidebar.css";
import jwt from "jwt-decode";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarHeaderRight,
  SidebarSearch,
  SidebarSearchContainer,
} from "./common";
import SidebarChat from "./SidebarChat";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));
function Sidebar(props) {
  const token = localStorage.getItem("token");
  const user = jwt(token);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/conversation/" + user.id
        );
        console.log(res.data.data);
        setConversations(res.data.data);
        console.log(conversations);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);
  const classes = useStyles();
  return (
    <SidebarContainer>
      <SidebarHeader>
        <Avatar />
        <SidebarHeaderRight>
          <IconButton
            style={{ marginRight: "2vw", fontSize: "24px !important" }}
          >
            <AddCircleOutlinedIcon />
          </IconButton>
          <IconButton
            style={{ marginRight: "2vw", fontSize: "24px !important" }}
          >
            <ChatIcon />
          </IconButton>
          <IconButton style={{ fontSize: "24px !important" }}>
            <MoreVertIcon />
          </IconButton>
        </SidebarHeaderRight>
      </SidebarHeader>
      <SidebarSearch>
        <SidebarSearchContainer>
          {/* <input type="text" placeholder="Search" /> */}
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </SidebarSearchContainer>
      </SidebarSearch>
      <div className="sidebar__chats">
        {conversations.map((c) => (
          <div
            onClick={() => {
              props.handler(c);
            }}
          >
            <SidebarChat conversation={c} currentUser={user} />
          </div>
        ))}
      </div>
    </SidebarContainer>
  );
}

export default Sidebar;
