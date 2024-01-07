const mongoose = require('mongoose')
const { model, Schema } = mongoose

const companiesSchema = new Schema({
    companyName: String,
    companyCIF: String,
    companyActive: Boolean,
    companyDeleted: Boolean,
}, { timestamps: true })

const Companies = model('Companies', companiesSchema)

module.exports = Companies