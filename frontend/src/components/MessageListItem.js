import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import moment from "moment";

const MessageListItem = (props) => {
  const { item, socket, userSelected } = props;
  const user = useSelector((state) => state.user);
  const [lastMessage, setLastMessage] = useState(item.lastMessage);
  const compareFunction = (a, b) => {
    const dateA = moment(a.lastMessage.updatedAt);
    const dateB = moment(b.lastMessage.updatedAt);

    // Sử dụng toISOString để chuyển đổi ngày thành chuỗi có thứ tự
    if (dateA.toISOString() < dateB.toISOString()) {
      return 1;
    }
    if (dateA.toISOString() > dateB.toISOString()) {
      return -1;
    }
    return 0;
  };

  const unReadMess = item.lastSeen.filter((usr) => usr.user === user?.user._id);

  useEffect(() => {
    socket.io.on("open", () => {
      console.log("connected");
    });
    console.log("CHAT_" + item.user._id);
    // socket.on("get_conversation", (data) => {
    //   console.log("====================================");
    //   console.log("data", data);
    //   console.log("====================================");
    //   updateConversations(data);
    //   //   setLastMessage(data);
    //   //   updateConversations((item) => {
    //   //     let newListConversation = item.map((conversation) => {
    //   //       if (conversation._id === data.conversation) {
    //   //         conversation.lastMessage = data;
    //   //       }
    //   //       return conversation;
    //   //     });
    //   //     console.log(
    //   //       "newListConversation",
    //   //       newListConversation.sort(
    //   //         (a, b) => a.lastMessage.updatedAt - b.lastMessage.updatedAt
    //   //       )
    //   //     );
    //   //     return newListConversation.sort(compareFunction);
    //   //   });
    // });
    return () => {
      socket.io.on("close", () => {
        console.log("unconnected");
      });

      // socket.removeAllListeners();
    };
  }, [socket, item]);
  return (
    <div>
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
            (item.lastMessage.sender === user.user._id ? "You: " : "") +
            (item.lastMessage.textMessage.length > 20
              ? item.lastMessage.textMessage.substring(0, 20) + "..."
              : item.lastMessage.textMessage)
          }
        />
        <ListItemText
          primary={
            userSelected?._id !== item.user?._id &&
            unReadMess[0]?.message !== item.lastMessage._id ? (
              <Badge badgeContent={" "} color="primary" variant="dot">
                <div> </div>
              </Badge>
            ) : (
              <div> </div>
            )
          }
          secondary={moment(item.lastMessage.createdAt).format("MMM-DD")}
          sx={{ textAlign: "right" }}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
};

export default MessageListItem;
