import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Button } from "react-bootstrap";
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
import Slider from "react-slick";
import ClearIcon from "@mui/icons-material/Clear";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

function MessageAdminPage() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [listImage, setListImage] = useState([]);
  const [txtMess, setTxtMess] = useState("");
  const user = useSelector((state) => state.user);

  const handleSelectUser = (user) => {
    setUserSelected(user);
    setMessages([]);
  };

  const sendMessage = () => {
    if (!txtMess && !listImage.length) return;
    const msg = {
      user: userSelected?._id,
      admin: user?.user?._id,
      textMessage: txtMess,
      file: listImage,
    };
    socket.emit("sendMessage", msg);
    setTxtMess("");
    setListImage([]);
  };

  const handleSelectImage = (e) => {
    console.log("images", e.target.files);
    setListImage([...listImage, URL.createObjectURL(e.target.files[0])]);
  };

  const handleDeleteImage = (item) => {
    const newListImage = listImage.filter((image) => image !== item);
    setListImage(newListImage);
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
                      alt={item.user?.name}
                      src={item.user?.avatar}
                      sx={{ width: 48, height: 48 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.user?.name}
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
          <CardContent className="w-100 position-relative">
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
              <div className="section-input">
                <div className="list-image">
                  {/* <ImageList sx={{ width: "100%", height: 150 }} cols={8}>
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          srcSet={`${item.img}`}
                          src={`${item.img}`}
                          alt={item.title}
                          className="img-message"
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList> */}
                  <Slider {...settings} slidesToShow={8}>
                    {listImage.map((item, idx) => (
                      <div key={idx} className="m-2">
                        <div className=" position-relative img-message">
                          <img src={item} alt={"img"} className="img-message" />
                          <Button
                            variant="outline"
                            className="p-0 btn-clear-img"
                            onClick={() => {
                              handleDeleteImage(item);
                            }}
                          >
                            <ClearIcon
                              className="border rounded-circle"
                              sx={{
                                fontSize: 18,
                                color: "black",
                                borderColor: "black",
                                backgroundColor: "white",
                              }}
                            ></ClearIcon>
                          </Button>
                        </div>
                      </div>
                    ))}
                    {/* <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div>
          <div>
            <CarouselItem></CarouselItem>
          </div> */}
                  </Slider>
                </div>
                <div className="d-flex align-items-center">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      name=""
                      id="fileInput"
                      accept="image/*"
                      className="d-none"
                      onChange={(e) => handleSelectImage(e)}
                    />
                    <label htmlFor="fileInput">
                      <CropOriginalIcon
                        sx={{ fontSize: 32 }}
                      ></CropOriginalIcon>
                    </label>
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
              </div>
            </Stack>
          </CardContent>
        </Box>
      </Box>
    </Container>
  );
}

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
};

export default MessageAdminPage;
