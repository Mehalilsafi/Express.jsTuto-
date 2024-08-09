import mongoose from "mongoose";
const productSchema=mongoose.Schema({
    productName:{
        type:mongoose.Schema.Types.String,
        required:trrue,
        unique:true,
    },
    price:mongoose.Schema.Types.Number,
    quantity:mongoose.Schema.Types.Number
})

export const Product=mongoose.model("Product",productSchema)