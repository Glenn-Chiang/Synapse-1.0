const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register/Create new user
usersRouter.post("/users", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      passwordHash,
      dateJoined: new Date(),
    });
    const savedUser = await user.save();
    res.json(savedUser)
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
