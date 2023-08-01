const express = require("express")
const student = express.Router()
const studentModel = require("../model/user/Student")
const nodemailer = require('nodemailer')
const PWD = require("../server")
const multer = require('multer')
const app = require("../server")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const myMail='sanket.mistry.rayoinnovations@gmail.com'
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
"@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz",
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
        console.log("sucessss")
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

// update student
student.put("/:id", (req, res) => {
    let studentId = req.params.id

    studentModel.updateOne({ _id: studentId }, req.body)
        .then(data => res.send(studentId))
})

// delete student
student.delete("/:id", (req, res) => {
    let studentId = req.params.id

    studentModel.deleteOne({ _id: studentId })
        .then(data => res.send(studentId))
        .catch(err => res.send(err))
})
student.post('/uploadImage', upload.single('file'), function (req, res) {
    // res.json({})
    console.log('Image:')
    console.log(req.body)
  })
student.post("/register",(req,res)=>{
    console.log("Registering student...")
    console.log(req.body[1].profileImg)
    let studentMail = req.body.email
    let studentId = req.body.firstName + generatePassword().slice(0,4)
    let studentPassword = generatePassword()

    var mailOptions = {
        from: 'sanket.mistry@rayoinnovations.com',
        to: studentMail,
        subject: 'Welcome to Saraswati Vidhyalaya - Successful Registration Confirmation',
        text: `Dear ${req.body.firstName + req.body.lastName},

        We hope this email finds you well. On behalf of Saraswati Vidhyalaya, we are delighted to inform you that your registration process has been successfully completed, and we are excited to welcome you to our school community!
        
        Congratulations on taking this important step in your educational journey. We are confident that [School Name] will provide you with a nurturing and intellectually stimulating environment to thrive in academics and personal development.
        
        Here are some important details regarding your successful registration:
        
        Student ID: ${studentId}
        Student Password : ${studentPassword}
       
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