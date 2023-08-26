const loginRouter = require("express").Router();
const passport = require("../middleware/auth");
const jwt = require("jsonwebtoken");

loginRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = jwt.sign({ id: user._id }, process.env.SECRET);
      res.json({ token, userId: user._id.toString(), username: user.username });
    } catch (error) {
      next(error);
    }
  }
);

module.exports(loginRouter);
