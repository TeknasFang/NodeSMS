const mongoose = require("mongoose")

let AuthorSchema = new mongoose.Schema({
    username:String,
    password:String
})

let AuthorModel = mongoose.model("auths",AuthorSchema)

module.exports = AuthorModel