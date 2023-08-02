const mongoose = require("mongoose")

let StudentSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Oops you forget to write your email']
    },
    phone: {
        type: String,
        required: [true, 'Oops you forget to write your mobile number']
    },
    dob: {
        type: String,
        required: [true, 'Oops you forget to write your roll number']
    },
    standard: {
        type: String,
        required: [true, 'Oops you forget to write your standard']
    },
    firstName: {
        type: String,
        required: [true, 'Oops you forget to write your firstName']
    },
    lastName: {
        type: String,
        required: [true, 'Oops you forget to write your lastName']
    }, address: {
        type: String,
        required: [true, 'Oops you forget to write your adress']
    }, stream: {
        type: String,
        required: [true, 'Oops you forget to write your stream']
    }, parentFirstName: {
        type: String,
        required: [true, 'Oops you forget to write your parentFirstName']
    },
    parentLastName: {
        type: String,
        required: [true, 'Oops you forget to write your name']
    }, parentEmail: {
        type: String,
        required: [true, 'Oops you forget to write your name']
    },
    parentPhone: {
        type: String,
        required: [true, 'Oops you forget to write your name']
    },
    imageFileName: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },studentImg:
    {
        data: Buffer,
        contentType: String
    }
})

let StudentModel = mongoose.model("students", StudentSchema)

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