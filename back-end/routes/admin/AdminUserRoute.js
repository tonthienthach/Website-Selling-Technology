const express = require("express");
const { verifyAdmin } = require("../../middleware/VerifyAdmin");
const { getAllUser } = require("../../controllers/AuthenController");

const router = express.Router();

router.get("/", verifyAdmin, getAllUser);
module.exports = router;
