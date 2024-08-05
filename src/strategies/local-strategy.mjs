
import passport from "passport"
import {Strategy} from "passport-local"
import {usersArray} from "../utils/constants"
export default passport.use(
    new Strategy((name,password, done)=>{  
  const findUser=usersArray.find((user)=>user.name===name)
  try{

      if(!findUser)throw new Error('user not found');
      if(findUser.password !==password) throw new Error("incrrect password")
      done(null,findUser)  
    }catch(err){
        done(err,null)

    }

    })
)