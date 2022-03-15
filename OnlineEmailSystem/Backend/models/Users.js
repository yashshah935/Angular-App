const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    mobileNumber: String,
    fname: String,
    lname: String,
    gender: String,
    password: String,
    email: { type: String, default: "nothing@gmail.com" }
})

const User = mongoose.model('User', UserSchema)

module.exports = User