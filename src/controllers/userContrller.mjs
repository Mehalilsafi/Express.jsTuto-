import { Router } from "express";
import { usersArray } from "../utils/constants.mjs";
import { idResolver } from "../utils/middlewares.mjs";
import { query, validationResult, matchedData, body } from "express-validator";
import { User } from "../mongoose/schemas/user.mjs";
import { hashPassword ,comparePassword} from "../utils/helpers.mjs";

const filterUser=(request,response)=>{
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

export {filterUser}