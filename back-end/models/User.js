const mongoose = require("mongoose");
const moment = require("moment-timezone");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
