const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const { verifyAdmin } = require("../middleware/VerifyAdmin");
const {
  getAllConversation,
  getConversationByUser,
  getMessageByConversation,
} = require("../controllers/MessageController");

const router = express.Router();

//get all brand
router.get(
  "/getMessageByConversation/:conversationId",
  verifyToken,
  getMessageByConversation
);
router.get("/getAllConversation", verifyAdmin, getAllConversation);
router.get(
  "/getConversationByUser/:userId",
  verifyToken,
  getConversationByUser
);

module.exports = router;
