import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import db from "../models/index.js";
const { User } = db
var GoogleStrategy = Strategy;

export const handlePassportConfig = async () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        const userObj = {
            name : profile?.displayName,
            email: profile?.emails?.[0]?.value,
            googleId:profile.id,
        }
        const user = await User.findOne({
            googleId:profile?.id,
        })
        if(user){
            return cb(null, user)
        }
        const newUser = await User.create({
            ...userObj
        });
        return cb(null, newUser)
      },
    ),
  );
};
