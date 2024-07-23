import express, { request, response } from "express";
const app = express();
const port = process.env.port || 3000;
app.use(express.json());
// get requests
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

const idReslover = (request, response, next) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    response.status(404).send("bad request ");
  }
  const findIndexUser = usersArray.findIndex((user) => user.id === parsedId);
  if (findIndexUser === -1) {
    response.status(404);
  }
  request.findIndexUser = findIndexUser;
  next();
};
const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} -- ${request.url}`);
  next();
};
app.use(loggingMiddleware);
//query paremters
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

// post requests
app.post("/api/users", (request, response) => {
  console.log(request.body);
  const newId =
    usersArray.length > 0 ? usersArray[usersArray.length - 1].id + 1 : 1;
  const newUser = {
    id: newId,
    ...body,
  };
  usersArray.push(newUser);
  response.status(201).send(newUser);
});

//rout params
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

//put request
app.patch("/api/users/:id", idReslover, (request, response) => {
  const { body, findIndexUser } = request;
  //override the usersArray[findIndexUser] with ...body request
  usersArray[findIndexUser] = { ...usersArray[findIndexUser], ...body };
  return response.status(200).send(usersArray[findIndexUser]);
});

//delete
app.delete("/api/users/:id", idReslover, (request, response) => {
  const { findIndexUser } = request;

  const userIndex = findIndexUser;
  const deletedUser = usersArray.splice(userIndex, 1)[0];
  return response.status(200).send(deletedUser);
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
