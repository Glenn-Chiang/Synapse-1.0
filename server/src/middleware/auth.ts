import passport from 'passport';
import {ExtractJwt, Strategy as JwtStrategy} from 'passport-jwt'
import {Strategy as LocalStrategy} from 'passport-local'
import User from '../models/User';
import {compare} from 'bcrypt'

// Local strategy used for login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // username and password are sent in request body of login request
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // Verify password
      const passwordsMatch = await compare(password, user.passwordHash);
      if (!passwordsMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      // Success
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Jwt strategy used to secure endpoints
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (!user) {
          return done(null, false, { info: "User not found" });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport