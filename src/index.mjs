import express, { request, response } from "express";
const app = express();
const port = process.env.port || 3000;
app.get("/", (request, response) => {
  response.send("hello woorld ");
});
const usersArray = [
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
];
app.get("/api/users", (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request;
  if (!filter && !value) return response.send(usersArray);
  if (filter && value) {
    response.send(usersArray.filter((user) => user[filter].includes(value)));
  }

  response.status("201").send(usersArray);
});
app.get("/api/users/:id", (request, response) => {
  const paresedInt = parseInt(request.params.id);
  if (isNaN(paresedInt)) {
    response.status(400).send("bad request");
  }
  const dynamicUser = usersArray.find((user) => user.id === paresedInt);
  if (!dynamicUser) {
    return response.status(404).send("not found bad request");
  } else {
    return response.send(dynamicUser);
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
