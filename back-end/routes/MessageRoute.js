const express = require("express");
const { verifyToken } = require("../middleware/VerifyToken");
const { getMessageByUser } = require("../controllers/MessageController");

const router = express.Router();

//get all brand
router.get("/getMessageByUser", verifyToken, getMessageByUser);

module.exports = router;
