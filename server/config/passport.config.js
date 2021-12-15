import User from "../models/User.js";
import { Strategy as LocalStrategy } from "passport-local";

export default function passportConfig(passport) {
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}
