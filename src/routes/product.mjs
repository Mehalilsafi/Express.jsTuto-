import {  Router } from "express";
const router=Router()

router.get("/api/products",(request, response)=>{
    response.status(200).send([{id:1,name:"chiken", price:2000}])
})

export default router