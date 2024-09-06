import { Router } from "express";
import { usersArray } from "../utils/constants.mjs";
import { idResolver } from "../utils/middlewares.mjs";
import { query, validationResult, matchedData, body } from "express-validator";
import { User } from "../mongoose/schemas/user.mjs";
import { filterUser } from "../controllers/userContrller.mjs";
import { hashPassword, comparePassword } from "../utils/helpers.mjs";
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
  filterUser
);

// post requests
router.post("/api/users", async (request, response) => {
  const { userName, password, displayName } = request.body; // Destructure fields from req.body
  const hashPassword = hashPassword(password);
  // Create a new user instance
  const newUser = new User({ userName, hashPassword, displayName });
  try {
    const savedUser = await newUser.save();
    return response.status(201).send(savedUser);
  } catch (err) {
    console.log(`errror for faild creat User:${err}`);
    return response.sendStatus(400);
  }
});
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
