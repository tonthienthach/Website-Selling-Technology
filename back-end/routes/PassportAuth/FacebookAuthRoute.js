const router = require("express").Router();
const passport = require("passport");

router.get("/", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
  "/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/login-success");
  }
);

module.exports = router;
