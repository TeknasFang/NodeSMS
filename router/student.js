const express = require("express")
const student = express.Router()
const studentModel = require("../model/user/Student")
const nodemailer = require('nodemailer')
const PWD = require("../server")
const multer = require('multer')
const app = require("../server")
var path = require('path')
var fs = require('fs')
let DIR = require('../server')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

const myMail = 'sanket.mistry.rayoinnovations@gmail.com'
const myPassword = PWD
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: "sanket.mistry@rayoinnovations.com",
        pass: "UWwR9Zm35FTB8CnY",
    },
});

function generatePassword() {
    var length = 12,
        charset =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
        password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}
// add student
student.post("/", (req, res) => {
    console.log(req.body)
    studentModel.create(req.body).then(user => {
        console.log("New Student Added !!!")
        res.send(user)
    }).catch(err => res.send(err))
})

// get students
student.get("/", (req, res) => {
    studentModel.find({}).then(data => {
        console.log(data)
        res.send(data)
    })
})

student.get("/:username",(req,res)=>{
    let username = req.params.username
    console.log(username)
    studentModel.findOne({username}).then(data=>{
        console.log(data)
        res.send({statusCode:200,data})
    }) 
})

// update student
student.put("/:username", (req, res) => {
    let username = req.params.username
    console.log("updating student !!!")
    console.log(username)
    console.log(req.body)
    studentModel.updateOne({ username: req.body.username }, req.body)
        .then(data => res.send(username))
})

// delete student
student.delete("/:id", (req, res) => {
    let username = req.params.id

    studentModel.deleteOne({ username: username })
        .then(data => res.send(username))
        .catch(err => res.send(err))
})
 
student.post('/uploadImage/:id', upload.single('file'), function (req, res) {
    let username = req.params.id.toString()
    let imagePath = path.join( '/home/sanketmistry/react-prc/sms-backend/uploads/' + username + '.png')
    let img = fs.readFileSync(imagePath)
    studentModel.findOneAndUpdate({ _id: username }, {
        studentImg:
        {
            data: img,
            contentType: 'image/png'
        }
    }).then(res => console.log("updated successfully !!"))
    console.log("Adding Image...")
    console.log(req.body)
    res.send("sucess!!")
})

student.post("/register", (req, res) => {
    console.log("Registering student...")
    console.log(req.body)
    let studentMail = req.body.email
    let username = req.body.firstName + generatePassword().slice(0, 4)
    let password = generatePassword()
    console.log(username, password)
    let studentData = { ...req.body, username, password, role:'student' }
    console.log(studentData)

    studentModel.create(studentData).then(user => {
        console.log("New Student Added !!!")
        res.send(user)
    }).catch(err => res.send(err))

    var mailOptions = {
        from: 'sanket.mistry@rayoinnovations.com',
        to: studentMail,
        subject: 'Welcome to Saraswati Vidhyalaya - Successful Registration Confirmation',
        text: `Dear ${req.body.firstName + req.body.lastName},

        We hope this email finds you well. On behalf of Saraswati Vidhyalaya, we are delighted to inform you that your registration process has been successfully completed, and we are excited to welcome you to our school community!
        
        Congratulations on taking this important step in your educational journey. We are confident that [School Name] will provide you with a nurturing and intellectually stimulating environment to thrive in academics and personal development.
        
        Here are some important details regarding your successful registration:
        
        Student ID: ${username}
        Student Password : ${password}
       
        As a new student, you will soon embark on an exciting adventure filled with numerous learning opportunities, extracurricular activities, and friendships that will last a lifetime. Our faculty and staff are dedicated to fostering a supportive and inclusive learning environment that promotes academic excellence and character development.
        
        If you have any questions or require any further information, please feel free to contact our administrative office at [School Contact Number] or email us at [School Email Address]. We are more than happy to assist you with any inquiries you may have.
        
        Once again, congratulations on becoming a part of the Saraswati Vidhyalaya family. We are eagerly looking forward to meeting you and working together to unlock your potential and achieve great heights.
        
        Best regards,
        
        Sanket Mistry
        Principal
        Saraswati Vidhyalaya
        7041139593
        sanket.m.mistry@gmail.com`
    };

    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });


})
module.exports = student 