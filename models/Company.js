const mongoose = require('mongoose')
const { model, Schema } = mongoose

const companySchema = new Schema({
    companyName: String,
    companyCIF: String,
    companyActive: Boolean,
}, { timestamps: true })

const Company = model('Company', companySchema)

module.exports = Company