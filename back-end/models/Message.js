const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    textMessage: {
      type: String,
      trim: true,
      require: true,
    },
    file: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
