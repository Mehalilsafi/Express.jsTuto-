import { usersArray } from "./constants.mjs";

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
  export {idReslover}