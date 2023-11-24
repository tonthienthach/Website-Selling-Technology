const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const { verifyAdmin } = require("../middleware/VerifyAdmin");
const {
  getMessageByUser,
  getAllConversation,
} = require("../controllers/MessageController");

const router = express.Router();

//get all brand
router.get("/getMessageByUser", verifyToken, getMessageByUser);
router.get("/getAllConversation", verifyAdmin, getAllConversation);

module.exports = router;
