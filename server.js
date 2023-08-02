const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require('body-parser');
const DIR = __dirname
// support parsing of application/json type post data
const studentRouter = require("./router/student")
const authRouter = require("./router/auth")
const PORT = process.env.PORT | 5800
require("dotenv").config()
const PWD='sanket6934'
const mongo_url ="mongodb+srv://SanketMistry:sanket6934@clusternew.v8ubdgd.mongodb.net/SMS"
mongoose.connect(mongo_url,).then(()=>{
    console.log("successfully connected !!!")
})

const app=express()
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// routes
app.use("/student",studentRouter)
app.use("/auth",authRouter)

app.listen(PORT,()=>{
    console.log(DIR)
    console.log("listening at port : "+PORT)
})

app.get("/",(req,res)=>{
    res.send('hello')
})

module.exports = app