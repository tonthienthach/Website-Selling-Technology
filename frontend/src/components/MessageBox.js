/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "./MessageBox.css";
import { Button } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import io from "socket.io-client";
import MessageItem from "./MessageItem";
import messageApi from "../axios/messageApi";
import { useSelector } from "react-redux";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

function MessageBox(props) {
  const [showBox, setShowBox] = useState(false);
  const [txtMess, setTxtMess] = useState("");
  const [messages, setMessages] = useState([]);
  // const user = useSelector((state) => state.user);
  const { user } = props;

  const sendMessage = () => {
    const msg = {
      user: user?.user?._id,
      textMessage: txtMess,
      file: [],
    };
    socket.emit("sendMessage", msg);
    setTxtMess("");
  };
  useEffect(() => {
    const getMessageByUser = async () => {
      const { data } = await messageApi.getMessageByUser();
      if (data?.data?.length) {
        setMessages(data.data);
      }
      console.log("====================================");
      console.log("data 1", messages);
      console.log("====================================");
    };
    getMessageByUser();
  }, []);
  useEffect(() => {
    socket.io.on("open", () => {
      console.log("connected");
    });

    socket.on("CHAT_" + user?.user?._id, (data) => {
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
  }, [messages, user]);
  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Font_Awesome_5_brands_facebook-messenger_color.svg/1792px-Font_Awesome_5_brands_facebook-messenger_color.svg.png"
        className="message-icon"
        alt="image"
        onClick={() => setShowBox(true)}
      />
      {showBox && (
        <div className="card message-box">
          <div className="card-body">
            <div className="position-relative">
              <h5 className="card-title text-center">Tech Shop</h5>
              <Button
                variant="outline"
                className="p-0 border rounded-circle ms-1 btn-clear"
                onClick={(e) => {
                  setShowBox(false);
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
              {/* <MessageItem type={"send"} />
              <MessageItem type={"receive"} />
              <MessageItem type={"send"} />
              <MessageItem type={"receive"} />
              <MessageItem type={"send"} />
              <MessageItem type={"receive"} /> */}
            </div>
            <div className="d-flex align-items-center mt-2">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageBox;
