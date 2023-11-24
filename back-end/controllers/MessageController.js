const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.messageHandler = async (io) => {
  io.on("connect", (socket) => {
    console.log("nguoi dung ket noi");
    socket.on("sendMessage", async (data) => {
      const conversation = await Conversation.findOne({ user: data.user });
      let newMessage = null;
      if (conversation) {
        newMessage = new Message({
          conversation: conversation._id,
          sender: data.admin || data.user,
          textMessage: data.textMessage,
          file: data.file,
        });
        conversation.lastMessage = newMessage._id;
        await newMessage.save();
        await conversation.save();
        console.log("luu thanh cong1");
      } else {
        const newConversation = new Conversation({
          user: data.user,
          lastSeen: [],
        });
        await newConversation.save();
        newMessage = new Message({
          conversation: newConversation._id,
          sender: user.admin || data.user,
          textMessage: data.textMessage,
          file: data.file,
        });

        newConversation.lastMessage = newMessage;

        await newMessage.save();
        await newConversation.save();
        console.log("luu thanh cong2");
      }
      console.log(newMessage);
      socket.emit(`CHAT_${data.user}`, newMessage);
    });
  });

  io.on("disconnect", (socket) => {
    console.log("nguoi dung ngat ket noi");
  });
};

exports.getMessageByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const listMessage = await Message.find({ sender: userId });

    res.status(200).json({
      success: true,
      data: listMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "get message err",
    });
  }
};

exports.getAllConversation = async (req, res) => {
  const allConversation = await Conversation.find()
    .populate(["user", "lastMessage"])
    .sort({
      createdAt: -1,
    });

  return res.status(200).json({
    success: true,
    data: allConversation,
  });
};
