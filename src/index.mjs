import express, { request, response } from "express";
import userRouter from "./routes/users.mjs";
import product from "./routes/product.mjs";
import { query, validationResult, matchedData, body } from "express-validator";
import cookieParser from "cookie-parser";
import session from "express-session";
import { usersArray } from "./utils/constants.mjs";
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
app.use(userRouter);
app.use(product);
app.get("/", (request, response) => {
  console.log(request.session.id);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 60000*600 }); // Set a cookie
  response.send({ msg: "hello world" }); // Send a response
});

app.post(
  "/api/auth",
  [
    body("name")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("must not be empty"),
    body("work")
      .isString()
      .withMessage("must be a string")
      .notEmpty()
      .withMessage("must not be empty"),
    body("password")
      .isString()
      .withMessage("Password must be a string")
      .notEmpty()
      .withMessage("Password must not be empty"),
  ],
  (request,response) => {
    const {
      body: { name, password },
    } = request;
    const findUser = usersArray.find((user) => user.name === name);
    if (!findUser) {
      return response.status(401).send("user not found ");
    }
    const ispasswordCorrect =findUser.password=== password
    if(!ispasswordCorrect){
      return response.status(401).send("wrong password")
    }
    request.session.user = findUser;
    return response.status(200).send(findUser);
  }
);
app.get("/api/auth/status",(request,response)=>{
  return  request.session.user ? response.status(200).send(request.session.user):response.status(401).send("wrong information")
})
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
