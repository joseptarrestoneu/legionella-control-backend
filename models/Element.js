const mongoose = require('mongoose')
const { model, Schema } = mongoose

const elementSchema = new Schema({
    elementName: String,
    elementReference: String,
    elementDescription: String,
    elementUbication: String,
    elementCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Companies' 
    },
    elementAreaId: {
        type: Schema.Types.ObjectId, 
        ref: 'Area' 
    },
    elementActive: Boolean,
    elementDeleted: Boolean,
}, { timestamps: true })

const Element = model('Element', elementSchema)

module.exports = Element