const express=require("express")
const auth=express.Router()
const authModel = require("../model/authentication/Author")
//get authentication info
auth.get("/",(req,res)=>{
    authModel.find({}).then(data=>{
        console.log(data)
        res.send({statusCode:200,data})
    }) 
})

//set authentication
auth.post("/",(req,res)=>{
    authModel.create(req.body).then(user=>console.log("sucessss"))
})

module.exports=auth