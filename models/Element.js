const mongoose = require('mongoose')
const { model, Schema } = mongoose

const elementSchema = new Schema({
    elementName: String,
    elementReference: String,
    elementDescription: String,
    elementUbication: String,
    elementCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Company' 
    },
    elementAreaId: {
        type: Schema.Types.ObjectId, 
        ref: 'Area' 
    },
    elementUpkeepId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Upkeep'
        },  
    ],
    elementActive: Boolean,
}, { timestamps: true })

const Element = model('Element', elementSchema)

module.exports = Element