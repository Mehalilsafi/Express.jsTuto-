import express, { request, response } from "express";
import userRouter from "./routes/users.mjs";
import product from "./routes/product.mjs";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(cookieParser())
app.use(userRouter);
app.use(product);
app.get("/",(request,response)=>{
  response.cookie('hello','world',{maxAge:60000})
  response.send({msg:"hello world"})
})
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
