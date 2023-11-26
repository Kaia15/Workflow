import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Button,
  Divider,
  TextField,
} from "@mui/material";
import Conversation from "../../../components/conversation";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../../context/context";
import SendingBar from "./sending_bar";
import NavigationBar from "../navigation_bar";
import PopUpButton from "./popup_button";
import ChatDiv from "./chat_div";
// import { axios } from '../../../config';

const getMessage = async (id) => {
  const message = await axios.get(`http://localhost:8000/message/${id}`);
  const data = await message.data;
  return data;
};

const createMessage = async (body) => {
  const message = await axios.post(`http://localhost:8000/message/create`, {
    ...body,
  });
  const data = await message.data;
  return data;
};

const RenderMessage = ({ handleNewChat, users }) => {
  const { isValid, setIsValid } = useContext(AuthContext);
  const { currentChat, setCurrentChat } = useContext(AuthContext);
  const [currentMessage, setCurrentMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState("");
  const scrollRef = useRef();
  const [chatColor, setChatColor] = useState("white");
  const { allConversations, setAllConversations } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [newMemberId, setNewMemberId] = useState("");
  // const [newMemberName, setNewMemberName] = useState("")

  let userId;
  let username;
  // console.log(chats)
  const user = JSON.parse(localStorage.getItem("user")) || null;
  if (user !== null) {
    userId = user["id"];
    username = user["username"];
  }

  // console.log(userId);

  const newContacts = users.filter((cont) => {
    let ids = [];
    allConversations.map((m) => {
      ids.push(...m["members"]);
    });
    return ids.indexOf(cont["_id"]) === -1;
  });

  const contactIds = newContacts.map((cont) => cont["_id"]);
  // console.log(contactIds);

  const contactNames = newContacts.map((cont) => cont["username"]);

  // console.log(a)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      // console.log(data)
      setArrivalMessage({
        sender: data.senderId,
        receiver: data.receiverId,
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setCurrentMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => console.log(users));
  }, [socket]);

  useEffect(() => {
    if (currentChat !== null) {
      // console.log(currentChat['_id'])
      const messages = getMessage(currentChat["_id"]);
      messages
        .then((res) => {
          // console.log(res)
          setCurrentMessage(res);
        })
        .catch((err) => console.log(err));
    }
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessage]);

  const addMessage = async () => {
    if (currentChat) {
      if (newMessage !== "") {
        const mess = {
          conversationId: currentChat["_id"],
          sender: userId,
          receiver: currentChat["members"].find((mem) => mem !== userId),
          text: newMessage,
        };
        // console.log(mess)
        // console.log(socket)
        socket.current.emit("sendMessage", {
          senderId: userId,
          receiverId: mess["receiver"],
          // conversationId: currentChat['_id'],
          text: newMessage,
        });
        setCurrentMessage((prev) => [...prev, mess]);
        createMessage(mess)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        setNewMessage("");
      }
    }
  };

  // console.log(currentChat)
  // console.log(newMessage)
  // console.log(currentMessage)
  // console.log(a)
  // console.log(userId)
  // console.log(chat_responders)
  // console.log(arrivalMessage)
  /*let id2
    if (users !== null) id2 = users[24]['_id']*/
  console.log(newMemberId);

  return (
    <div style={{ height: "100vh" }}>
      {isValid ? (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              borderRadius: "4px",
              backgroundColor: "rgb(235, 236, 240)",
              margin: "12px",
            }}
          >
            <NavigationBar page = "message" />
          </div>
          <div style={{ display: "flex", flexDirection: "row", flex: "6" }}>
            <div
              style={{ flex: "2", display: "flex", flexDirection: "column" }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", flex: "10" }}
              >
                <PopUpButton
                  setNewMemberId={setNewMemberId}
                  contactIds={contactIds}
                  open={open}
                  handleClose={handleClose}
                  userId={userId}
                  setOpen={setOpen}
                  handleClickOpen={handleClickOpen}
                  handleNewChat={handleNewChat}
                  newMemberId={newMemberId}
                  contactNames={contactNames}
                />

                <TextField
                  label="Search"
                  id="search"
                  type="text"
                  style={{ margin: "8px 12px", borderRadius: "6px" }}
                  size="small"
                  variant="outlined"
                  color="primary"
                  focused
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {allConversations.length > 0 &&
                    allConversations.map((b, index) => {
                      // console.log(b)
                      const receivers = b["members"].filter(
                        (mem) => mem !== userId
                      );
                      // console.log(receivers)
                      return (
                        <Button
                          onClick={() => {
                            setCurrentChat(b);
                          }}
                          style={{
                            width: '100%',
                            height: "60px",
                            backgroundColor: chatColor,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start'
                          }}
                        >
                          <Conversation id={receivers} />
                        </Button>
                      );
                    })}
                </div>
              </div>
            </div>
            <Divider orientation="vertical" fullWidth />
            <div style={{ flex: "6", height: "100vh" }}>
              {currentMessage ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                  }}
                >
                    <ChatDiv currentMessage = {currentMessage}
                    currentChat = {currentChat} 
                    userId = {userId} 
                    scrollRef = {scrollRef}
                    />
                  
                  <div
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <SendingBar
                      setNewMessage={setNewMessage}
                      newMessage={newMessage}
                      addMessage={addMessage}
                    />
                  </div>
                </div>
              ) : (
                <p
                  style={{
                    color: "gray",
                    fontSize: "36px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Open the new conversation{" "}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ margin: "20px" }}>
          <p style={{ margin: "0px 10px" }}> Your time is expired </p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={{ margin: "10px" }}>
              return to login
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RenderMessage;
