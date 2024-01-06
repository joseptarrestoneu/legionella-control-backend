const mongoose = require('mongoose')
const { model, Schema } = mongoose

const upkeepTypeSchema = new Schema({
    upkeepTypeName: String,
    upkeepTypeUnits: String,
    upkeepTypeCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Companies' 
    },
    upkeepTypeActive: Boolean,
}, { timestamps: true })

const UpkeepType = model('UpkeepType', upkeepTypeSchema)

module.exports = UpkeepType