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
  (request, response) => {
    console.log("user print :")
    console.log(request.user)
    console.log("session print :")
    console.log(request.session)
    response.sendStatus(200);
  }
);
app.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);

  request.logout((err) => {
    if (err) return response.sendStatus(401);
    return response.sendStatus(200); 
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
// The session is created on the server with an object containing the userId.
// The server responds with a session ID that the browser stores in a cookie.
// The browser saves the session ID, e.g., sessionID=abc123, and sends this cookie with subsequent requests.
// The server uses the cookie-parser middleware to parse the cookie from a string into a JavaScript object.
// Based on the session ID in the cookie, the server identifies the user who sent the request.
// Remember, HTTP is stateless, meaning each request is independent of others.
// When you set req.session.visited = true, it stores this information in the session object on the first visit.
// On subsequent requests, the same session ID (from the cookie) is sent, allowing the server to retrieve and maintain the session state.
