/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import "./MessageBox.css";
import { Button } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import io from "socket.io-client";
import MessageItem from "./MessageItem";
import messageApi from "../axios/messageApi";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import Slider from "react-slick";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function MessageBox(props) {
  const [showBox, setShowBox] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const [txtMess, setTxtMess] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [listImage, setListImage] = useState([]);
  const chatRef = useRef(null);

  // const user = useSelector((state) => state.user);
  const { user } = props;

  const sendMessage = () => {
    if (!txtMess && !listImage.length) return;
    const msg = {
      user: user?.user?._id,
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

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dtksctz3g",
        uploadPreset: "o2ijzzgc",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          console.log("upload", result.info.url);
          setListImage([...listImage, result.info.url]);
        }
      }
    );
    widget.open();
  }

  const handleShowOffMessageBox = () => {
    setShowBox(false);
    messageApi.updateLastSeen({
      messageId: messages[messages.length - 1]?._id,
      user: user?.user?._id,
    });
  };

  useEffect(() => {
    const getMessageByUser = async () => {
      if (!user) return;
      const { data } = await messageApi.getMessageByUser(user?.user?._id);
      if (data?.data?.length) {
        setMessages(data.data);
      }
    };
    getMessageByUser();
    const getConversationByUser = async () => {
      if (!user) return;
      const { data } = await messageApi.getConversationByUser();
      console.log("Conversation", data);
      if (data?.success) {
        setConversation(data.data);
        const unReadMess = data.data.lastSeen.filter(
          (usr) => usr.user === user?.user._id
        );
        setNewMessage(unReadMess);
      }
    };
    getConversationByUser();
  }, [user]);

  useEffect(() => {
    // Cuộn xuống cuối khi có thay đổi trong messages
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showBox]);
  useEffect(() => {
    socket.io.on("open", () => {
      console.log("connected");
    });

    socket.on("CHAT_" + user?.user?._id, (data) => {
      console.log("====================================");
      console.log("data", data);
      console.log("====================================");
      setMessages([...messages, data]);
      if (!showBox) {
        setNewMessage(true);
        console.log("showBox true");
      } else {
        setNewMessage(false);
        console.log("showBox false");
      }
    });
    return () => {
      socket.io.on("close", () => {
        console.log("unconnected");
      });
      socket.emit("sendLastSeen", {
        conversationId: messages[messages.length - 1],
        userId: user?.user?._id,
      });
      // socket.removeAllListeners();
    };
  }, [messages, showBox, user]);

  return (
    <div>
      <div className="message-section">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Font_Awesome_5_brands_facebook-messenger_color.svg/1792px-Font_Awesome_5_brands_facebook-messenger_color.svg.png"
          className="message-icon"
          alt="image"
          onClick={() => setShowBox(!showBox)}
        />
        {newMessage[0]?.message !== conversation?.lastMessage._id && (
          <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle notification">
            <span className="visually-hidden">New alerts</span>
          </span>
        )}
      </div>
      {showBox && (
        <div className="card message-box">
          <div className="card-body">
            <div className="position-relative">
              <h5 className="card-title text-center">Tech Shop</h5>
              <Button
                variant="outline"
                className="p-0 border rounded-circle ms-1 btn-clear"
                onClick={() => {
                  handleShowOffMessageBox();
                }}
              >
                <ClearIcon></ClearIcon>
              </Button>
            </div>
            <hr />
            <div className="message-body">
              {messages.length > 0 &&
                messages.map((message, idx) => (
                  <MessageItem
                    key={idx}
                    type={
                      message.sender === user?.user._id ? "send" : "receive"
                    }
                    message={message}
                  />
                ))}
              <div ref={chatRef}></div>

              {/* <MessageItem type={"send"} />
              <MessageItem type={"receive"} />
              <MessageItem type={"send"} />
              <MessageItem type={"receive"} />
              <MessageItem type={"send"} />
              <MessageItem type={"receive"} /> */}
            </div>
            <div className="section-input">
              <div className="list-image ml-2" style={{ width: "86%" }}>
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
                <Slider {...settings} slidesToShow={4}>
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
                </Slider>
              </div>
              <div className="d-flex align-items-center my-2">
                <Button
                  variant="contained"
                  // className="mb-2 me-2"
                  onClick={showWidget}
                >
                  <CropOriginalIcon sx={{ fontSize: 32 }}></CropOriginalIcon>
                </Button>
                <div className="input-group" style={{ width: "76%" }}>
                  {/* <input
                  type="file"
                  name=""
                  id="fileInput"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => handleSelectImage(e)}
                />
                <label htmlFor="fileInput">
                  <CropOriginalIcon sx={{ fontSize: 32 }}></CropOriginalIcon>
                </label> */}
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
          </div>
        </div>
      )}
    </div>
  );
}

export const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToScroll: 1,
};

export default MessageBox;
