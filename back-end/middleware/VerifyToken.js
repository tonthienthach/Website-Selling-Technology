const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }

  try {
    const decode = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    console.log(decode);

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "invalid token",
    });
  }
};
