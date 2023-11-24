const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const { verifyAdmin } = require("../middleware/VerifyAdmin");
const {
  getMessageByUser,
  getAllConversation,
  getConversationByUser,
} = require("../controllers/MessageController");

const router = express.Router();

//get all brand
router.get("/getMessageByUser/:userId", verifyToken, getMessageByUser);
router.get("/getAllConversation", verifyAdmin, getAllConversation);
router.get(
  "/getConversationByUser/:userId",
  verifyToken,
  getConversationByUser
);

module.exports = router;
