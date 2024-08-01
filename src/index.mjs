import express, { request, response } from "express";
import userRouter from "./routes/users.mjs";
import product from "./routes/product.mjs";
import cookieParser from "cookie-parser";
import { Session } from "express-session";
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(cookieParser())
app.use(Session())
app.use(userRouter);
app.use(product);
app.get("/",(request,response)=>{
  response.cookie('hello','world',{maxAge:60000})
  response.send({msg:"hello world"})
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