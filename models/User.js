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
    userCompanyId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Companies' 
    },
    userActive: Boolean,
    userDeleted: Boolean,
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User