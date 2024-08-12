import passport from "passport";
import { Strategy } from "passport-local";
import { usersArray } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/user.mjs";
//The serializeUser function decides what part of the user object should be stored in the session. and take the validat userObject from the local stratgy
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//When a request is made and the session ID is found, Passport.js uses this deserializeUser function to turn that session ID back into a full user object.
passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById();
    if (!findUser) throw new Error("User Nt Found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
  //At this point, Passport adds this full user object to request.user.
});

export default passport.use(
  new Strategy({ usernameField: "name" }, async (name, password, done) => {
    try {
      const findUser = await User.findne({ userName });
      if (!findUser) throw new Error("user not found");
      if (findUser.password !== password) throw new Error("incrrect password");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
