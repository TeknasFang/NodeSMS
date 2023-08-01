const mongoose = require("mongoose")

let StudentSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:[true,'Oops you forget to write your email']
    },
    phone:{
        type:String,
        required:[true,'Oops you forget to write your mobile number']
    },
    dob:{
        type:String,
        required:[true,'Oops you forget to write your roll number']
    },
    standard:{
        type:String,
        required:[true,'Oops you forget to write your standard']
    },
    firstName:{
        type:String,
        required:[true,'Oops you forget to write your name']
    },
    lastName:{
        type:String,
        required:[true,'Oops you forget to write your name']
    },adress:{
        type:String,
        required:[true,'Oops you forget to write your name']
    },stream:{
        type:String,
        required:[true,'Oops you forget to write your name']
    },parentFirstName:{
        type:String,
        required:[true,'Oops you forget to write your name']
    },
    parentLastName:{
        type:String,
        required:[true,'Oops you forget to write your name']
    },parentEmail:{
        type:String,
        required:[true,'Oops you forget to write your name']
    },
    parentPhone:{
        type:String,
        required:[true,'Oops you forget to write your name']
    },
})

let StudentModel = mongoose.model("students",StudentSchema)

module.exports = StudentModel

// 
// firstName: 'Lalit ',
//   lastName: 'Prajapati',
//   email: 'lalit.prajapati@rayoinnovations.com',
//   phone: 'aaa',
//   dob: '2023-08-20',
//   address: 'aaa',
//   standard: '1',
//   stream: 'commerce',
//   parentFirstName: 'a',
//   parentLastName: 'a',
//   parentEmail: 'sanket.mistry@rayoinnovations.com',
//   parentPhone: 'a'