import express, { request, response } from "express";
import { query, validationResult } from "express-validator";
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
app.get(
  "/api/users",
  [
    //query take the query paramters 
    query('filter')
    .optional()
    .isString()
    .isLength({ min: 3, max: 10 })
    .withMessage("Filter must be a string between 3 and 10 characters"),
  query('value')
    .optional()
    .isString()
    .withMessage("Value must be a string"),
  ],
  (request, response) => {
    console.log(request.body);
    // validationResult cantain the errors of the validtion
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const {
      query: { filter, value },
    } = request;
    if (!filter && !value) return response.send(usersArray);
    if (filter && value) {
      response.send(usersArray.filter((user) => user[filter].includes(value)));
    }

    response.status("201").send(usersArray);
  }
);

// post requests
app.post("/api/users", (request, response) => {
  const { body } = request;
  const newId =
    usersArray.length > 0 ? usersArray[usersArray.length - 1].id + 1 : 1;
  const newUser = {
    id: newId,
    ...body,
  };
  usersArray.push(newUser);
  response.status(201).send(usersArray);
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
  console.log(request.body);
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
