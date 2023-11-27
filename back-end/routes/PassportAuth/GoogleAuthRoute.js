const router = require("express").Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:3000/" + req.user?._id);
  }
);

module.exports = router;
