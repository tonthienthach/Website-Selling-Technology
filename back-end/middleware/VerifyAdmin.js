const jwt = require("jsonwebtoken");

exports.verifyAdmin = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }

  try {
    const decode = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (decode.isAdmin) {
      req.isAdmin = decode.isAdmin;
      req.userId = decode.userId;
      next();
    } else {
      return res.status(400).json({
        success: false,
        message: "You are not a admin",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "You are not a admin",
    });
  }
};
