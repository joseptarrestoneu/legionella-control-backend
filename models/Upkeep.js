const mongoose = require('mongoose')
const { model, Schema } = mongoose

const upkeepSchema = new Schema({
    upkeepName: String,
    upkeepDescription: String,
    upkeepTypeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'upkeepType' 
    },
    upkeepCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Companies' 
    },
    upkeepActive: Boolean,
    upkeepDeleted: Boolean,
}, { timestamps: true })

const Upkeep = model('Upkeep', upkeepSchema)

module.exports = Upkeep