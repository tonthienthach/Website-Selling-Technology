const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const { verifyAdmin } = require("../middleware/VerifyAdmin");
const {
  getAllConversation,
  getMessageByUser,
  updateLastSeen,
} = require("../controllers/MessageController");

const router = express.Router();

//get all brand
router.get("/getMessageByUser/:userId", verifyToken, getMessageByUser);
router.get("/getAllConversation", verifyAdmin, getAllConversation);
router.put("/updateLastSeen", verifyToken, updateLastSeen);
module.exports = router;
