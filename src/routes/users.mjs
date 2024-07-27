import { Router } from "express";
import { usersArray } from "../utils/constants.mjs";
import { idResolver } from "../utils/middlewares.mjs";
import { query, validationResult, matchedData, body } from "express-validator";
const router = Router();

// the query paramters
router.get(
  "/api/users",
  [
    //query take the query paramters
    query("filter")
      .optional()
      .isString()
      .isLength({ min: 3, max: 10 })
      .withMessage("Filter must be a string between 3 and 10 characters"),
    query("value").optional().isString().withMessage("Value must be a string"),
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
router.post(
  "/api/users",
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
  ],
  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).send({ errors: errors.array() });
    }
    const data = matchedData(request);

    const newId =
      usersArray.length > 0 ? usersArray[usersArray.length - 1].id + 1 : 1;
    const newUser = {
      id: newId,
      ...data,
    };
    usersArray.push(newUser);
    response.status(201).send(usersArray);
  }
);
router.get("/api/users/:id", (request, response) => {
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
router.patch("/api/users/:id", idResolver, (request, response) => {
  console.log(request.body);
  const { body, findIndexUser } = request;
  //override the usersArray[findIndexUser] with ...body request
  usersArray[findIndexUser] = { ...usersArray[findIndexUser], ...body };
  return response.status(200).send(usersArray[findIndexUser]);
});

//delete
router.delete("/api/users/:id", idResolver, (request, response) => {
  const { findIndexUser } = request;

  const userIndex = findIndexUser;
  const deletedUser = usersArray.splice(userIndex, 1)[0];
  return response.status(200).send(deletedUser);
});

export default router;
