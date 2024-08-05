import express, { request, response } from "express";
import userRouter from "./routes/users.mjs";
import product from "./routes/product.mjs";
import { query, validationResult, matchedData, body } from "express-validator";
import cookieParser from "cookie-parser";
import session from "express-session";
import { usersArray } from "./utils/constants.mjs";
import passport from "passport";
import passportStratigy from "./strategies/local-strategy.mjs";
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "im safi",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, // 1 hour
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(userRouter);
app.use(product);
app.post(
  "/api/auth",
  passportStratigy.authenticate("local"),
  (request, response) => {}
);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
//  session are created on the server with an objct cantaine userId
//server response the with session id the browser
// browser save session id =abc123
//allow the brwoser to send the cookie in sub squent request
//server pares the ckie frm text to jason with cookie parser
//base oon the cooki the server with know who send request
//remmbre http is statles
