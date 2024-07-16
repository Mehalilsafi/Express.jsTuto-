import express, { request, response } from "express";
const app = express();
const port = process.env.port || 3000;
app.get("/", (request, response) => {
  response.send("hello woorld ");
});
app.get("/api/users", (request, response) => {
  response.status("201").send([
    {
      id: 1,
      name: "safi",
      work: "freelance",
    },
    {
      id: 2,
      name: "noor",
      work: "dev",
    },
  ]);
});

app.get("/api/products",(request,response)=>{
response.send([{id:1,name:'chicken'}])
})

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
