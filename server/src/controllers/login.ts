import * as express from "express";
const loginRouter = express.Router();
import {sign} from 'jsonwebtoken'
import passport from '../middleware/auth'

loginRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user as any
      const token = sign({ id: user?._id }, process.env.SECRET as string);
      res.json({ token, userId: user?._id.toString(), username: user?.username});
    } catch (error) {
      next(error);
    }
  }
);


export default loginRouter