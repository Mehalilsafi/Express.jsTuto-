import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    userName:{
        type:mongoose.Schema.Types.String,
        required:true,
        uniqe:true
    },
    displayName:mongoose.Schema.Types.String?
    password:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
})
export const user=mongoose.model("user",userSchema)