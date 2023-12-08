const mongoose = require('mongoose')
const { model, Schema } = mongoose

const userSchema = new Schema({
    userName: String,
    userLastName1: String,
    userLastName2: String,
    userDNI: String,
    userEmail: String,
    userUser: String,
    userPassword: String,
    userCompany: String,
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User