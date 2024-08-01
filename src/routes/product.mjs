import {  Router } from "express";
const router=Router()

router.get("/api/products",(request, response)=>{
  console.log(request.cookies)
if(request.cookies.hello && request.cookies.hello==="world")
    return response.status(200).send([{id:1,name:"chiken", price:2000}])

return response.send({msg:"sorry ,yu need the correct cookie "})
})

export default router