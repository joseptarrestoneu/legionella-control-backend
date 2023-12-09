const mongoose = require('mongoose')
const { model, Schema } = mongoose

const areaSchema = new Schema({
    areaName: String,
    areaCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Company' 
    },
    areaActive: Boolean,
}, { timestamps: true })

const Area = model('Area', areaSchema)

module.exports = Area