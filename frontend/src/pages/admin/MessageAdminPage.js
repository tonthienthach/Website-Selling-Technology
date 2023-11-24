import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import "./MessageAdminPage.css";
import MessageItem from "../../components/MessageItem";
import messageApi from "../../axios/messageApi";
import moment from "moment";
import io from "socket.io-client";

const items2 = ["UserOutlined", "LaptopOutlined", "NotificationOutlined"];

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function MessageAdminPage() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [txtMess, setTxtMess] = useState("");
  const user = useSelector((state) => state.user);

  const handleSelectUser = (user) => {
    setUserSelected(user);
    setMessages([]);
  };

  const sendMessage = () => {
    const msg = {
      user: userSelected?._id,
      admin: user?.user?._id,
      textMessage: txtMess,
      file: [],
    };
    socket.emit("sendMessage", msg);
    setTxtMess("");
  };

  useEffect(() => {
    const getConversation = async () => {
      const { data } = await messageApi.getAllConversation();
      setConversations(data?.data);
      console.log("conversation", data);
    };
    getConversation();

    const getMessageByUser = async () => {
      if (!userSelected) return;
      const { data } = await messageApi.getMessageByUser(userSelected?._id);
      if (data?.data?.length) {
        setMessages(data.data);
      }
      console.log("====================================");
      console.log("data 1", messages);
      console.log("====================================");
    };
    getMessageByUser();
  }, [userSelected]);

  useEffect(() => {
    socket.io.on("open", () => {
      console.log("connected");
    });
    console.log("CHAT_" + userSelected?._id);
    socket.on("CHAT_" + userSelected?._id, (data) => {
      console.log("====================================");
      console.log("data", data);
      console.log("====================================");
      setMessages([...messages, data]);
    });
    return () => {
      socket.io.on("close", () => {
        console.log("unconnected");
      });

      // socket.removeAllListeners();
    };
  }, [messages, userSelected]);

  return (
    <Container>
      <Box sx={{ display: "flex", height: "100%", position: "relative" }}>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: "20%",
            flexShrink: 0,
            height: "100%",
            backgroundColor: "white",
          }}
        >
          <List>
            {conversations.map((item, i) => (
              <div key={i} onClick={() => handleSelectUser(item.user)}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt={item.user.name}
                      src={item.user.avatar}
                      sx={{ width: 48, height: 48 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.user.name}
                    secondary={
                      (item.lastMessage.sender === user.user._id
                        ? "You: "
                        : "") + item.lastMessage.textMessage
                    }
                  />
                  <ListItemText
                    primary={
                      <Badge badgeContent={" "} color="primary" variant="dot">
                        <div> </div>
                      </Badge>
                    }
                    secondary={moment(item.lastMessage.createdAt).format(
                      "MMM-DD"
                    )}
                    sx={{ textAlign: "right" }}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            height: "100%",
            width: "50%",
            position: "fixed",
            left: "38%",
            // right: "14%",
            backgroundColor: "white",
          }}
        >
          {/* Your main content goes here */}
          {userSelected && (
            <Stack
              direction="row"
              spacing={2}
              className="d-flex align-items-center mb-2"
            >
              <Avatar
                alt={userSelected.name}
                src={userSelected.avatar}
                sx={{ width: 54, height: 54 }}
              />
              <Typography variant="h6">{userSelected.name}</Typography>
            </Stack>
          )}

          <Divider />
          <CardContent className="w-100">
            <Stack className="w-100">
              <Stack className="message-body">
                {messages.map((message, idx) => (
                  <MessageItem
                    key={idx}
                    type={
                      message.sender === user?.user._id ? "send" : "receive"
                    }
                    message={message}
                  />
                ))}
                {/* <MessageItem
                  type={"receive"}
                  message={{ textMessage: "Haha hài lắm" }}
                />
                <MessageItem
                  type={"receive"}
                  message={{ textMessage: "Haha hài lắm" }}
                />
                <MessageItem
                  type={"send"}
                  message={{ textMessage: "Haha hài lắm" }}
                />
                <MessageItem
                  type={"receive"}
                  message={{ textMessage: "Haha hài lắm" }}
                />
                <MessageItem
                  type={"send"}
                  message={{
                    textMessage:
                      "Haha hài lắmHaha hài lắmHaha hài lắmHaha hài lắmHaha hài lắmHaha hài lắmHaha hài lắm",
                  }}
                />
                <MessageItem
                  type={"send"}
                  message={{ textMessage: "Haha hài lắm" }}
                /> */}
              </Stack>
              <div className="d-flex align-items-center">
                <div className="input-group mb-3">
                  <input
                    value={txtMess}
                    type="text"
                    className="form-control"
                    placeholder="Aa"
                    onChange={(e) => setTxtMess(e.target.value)}
                  />
                  <button
                    className="btn btn-send"
                    type="button"
                    id="button-addon2"
                    onClick={(e) => sendMessage()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </Stack>
          </CardContent>
        </Box>
      </Box>
    </Container>
  );
}

export default MessageAdminPage;
