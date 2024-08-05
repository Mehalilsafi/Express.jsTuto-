import passport from "passport";
import { Strategy } from "passport-local";
import { usersArray } from "../utils/constants.mjs";
export default passport.use(
  new Strategy({usernameField:'name'},(name, password, done) => {
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
