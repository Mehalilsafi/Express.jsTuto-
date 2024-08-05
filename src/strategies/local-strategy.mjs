import passport from "passport";
import { Strategy } from "passport-local";
import { usersArray } from "../utils/constants.mjs";

//The serializeUser function decides what part of the user object should be stored in the session. In this case, you're storing the user's id.
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//When a request is made and the session ID is found, Passport.js uses this deserializeUser function to turn that session ID back into a full user object.
passport.deserializeUser((id, done) => {
  try {
    const findUser = usersArray.find((user) => user.id === id);
    if (!findUser) throw new Error("User Nt Found");
    done(null,findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "name" }, (name, password, done) => {
    console.log(`userName :${name}`);
    console.log(` password:${password}`);
    const findUser = usersArray.find((user) => user.name === name);
    try {
      if (!findUser) throw new Error("user not found");
      if (findUser.password !== password) throw new Error("incrrect password");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
