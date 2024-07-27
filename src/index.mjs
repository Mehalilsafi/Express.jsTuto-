import express, { request, response } from "express";
import userRouter from "./routes/users.mjs";
import product from "./routes/product.mjs";
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
app.use(userRouter);
app.use(product);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
