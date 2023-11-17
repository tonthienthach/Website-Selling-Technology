const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.messageHandler = async (io) => {
  io.on("connect", (socket) => {
    console.log("nguoi dung ket noi");
    socket.on("sendMessage", async (data) => {
      const conversation = await Conversation.findOne({ user: data.user });
      console.log(conversation);
      if (conversation) {
        const newMessage = new Message({
          conversation: conversation._id,
          sender: data.user,
          textMessage: data.textMessage,
          file: data.file,
        });
        await newMessage.save();
        console.log("luu thanh cong1");
      } else {
        const newConversation = new Conversation({
          user: data.user,
          lastSeen: [],
        });
        await newConversation.save();
        const newMessage = new Message({
          conversation: newConversation._id,
          sender: data.user,
          textMessage: data.textMessage,
          file: data.file,
        });

        newConversation.lastMessage = newMessage;

        await newMessage.save();
        console.log("luu thanh cong2");
      }
    });
  });

  io.on("disconnect", (socket) => {
    console.log("nguoi dung ngat ket noi");
  });
};
