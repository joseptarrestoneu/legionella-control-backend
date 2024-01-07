const mongoose = require('mongoose')
const { model, Schema } = mongoose

const areaSchema = new Schema({
    areaName: String,
    areaCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Companies' 
    },
    areaActive: Boolean,
    areaDeleted: Boolean,
}, { timestamps: true })

const Area = model('Area', areaSchema)

module.exports = Area