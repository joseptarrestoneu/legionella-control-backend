const mongoose = require('mongoose')
const { model, Schema } = mongoose

const elementPlanningSchema = new Schema({
    elementId: {
        type: Schema.Types.ObjectId, 
        ref: 'Element' 
    },
    elementUpkeepId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Upkeep'
        },  
    ],
    elementPlanningDate: Date,
    elementDoDate: Date,
    elementCompanyId: {
        type: Schema.Types.ObjectId, 
        ref: 'Companies' 
    },
    elementUserPlanningId: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    elementUserDoId: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    elementPlanningValidation: Boolean,
    elementPlanningActive: Boolean,
}, { timestamps: true })

const ElementPlanning = model('ElementPlanning', elementPlanningSchema)

module.exports = ElementPlanning