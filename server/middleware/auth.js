const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Local strategy used for login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // username and password are sent in request body of login request
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return done(null, false, { info: "User not found" });
      }

      // Verify password
      const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordsMatch) {
        return done(null, false, { info: "Incorrect password" });
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

module.exports = passport;
