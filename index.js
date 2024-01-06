require('dotenv').config()
require('./mongo')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
// const routes = require('./routes/index')
const Companies = require('./models/Companies')
const Area = require('./models/Area')
const Element = require('./models/Element')
const Planning = require('./models/ElementPlanning')
const Upkeep = require('./models/Upkeep')
const Upkeeptype = require('./models/UpkeepType')
const User = require('./models/User')

app.use(express.json())
app.use(cors())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.res(req, res, 'content-length'), '-',
        JSON.stringify(req.body), 
    ].join(' ')   
}))

// app.use(routes)

// Company
app.get('/api/companies', (request, response) => {
    Companies.find({}).then(Companies => {
        response.json(Companies)
    })
})

app.get('/api/companies/:id', (request, response, next) => {
    const { id } = request.params;
    Companies.findById(id).then(Companies => {
        if (Companies) {
            return response.json(Companies)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/companies/:id', (request, response, next) => {
    const { id } = request.params;

    Companies.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
})

app.post('/api/companies', (request, response) => {
    const body = request.body

    if (!body.companyCIF) {
        return response.status(400).json({
            error: "CIF company missing"
        })
    }

    const newCompany = new Companies({
        companyName: body.companyName,
        companyCIF: body.companyCIF,
        companyActive: true,
    })

    newCompany.save().then(savedCompany => {
        response.json(savedCompany)
    })
})

app.put('/api/companies/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body;

    const newCompanyInfo = {
        companyName: body.companyName,
        companyCIF: body.companyCIF,
        companyActive: body.companyActive,
    }

    Companies.findByIdAndUpdate(id, newCompanyInfo, {new: true})
        .then(result => {
            response.json(result)
        })
})

// Area
app.get('/api/arees', (request, response) => {
    Area.find({}).populate("areaCompanyId")
    .then(area => {
        response.json(area)
    })
})

app.get('/api/arees/:id', (request, response, next) => {
    const { id } = request.params;
    Area.findById(id).then(area => {
        if (area) {
            return response.json(area)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/arees/:id', (request, response, next) => {
    const { id } = request.params;

    Area.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
})

app.post('/api/arees', (request, response) => {
    const body = request.body

    if (!body.areaName) {
        return response.status(400).json({
            error: "Name area missing"
        })
    }

    const newArea = new Area({
        areaName: body.areaName,
        areaCompanyId: body.areaCompanyId,
        areaActive: true,
    })

    newArea.save().then(savedArea => {
        response.json(savedArea)
    })
})

app.put('/api/arees/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body;

    const newAreaInfo = {
        areaName: body.areaName,
        areaCompanyId: body.areaCompanyId,
        areaActive: body.areaActive,
    }

    Area.findByIdAndUpdate(id, newAreaInfo, {new: true})
        .then(result => {
            response.json(result)
        })
})

// Element
app.get('/api/elements', (request, response) => {
    Element.find({}).populate("elementCompanyId").populate("elementAreaId")
    .then(element => {
        response.json(element)
    })
})

app.get('/api/elements/:id', (request, response, next) => {
    const { id } = request.params;
    Element.findById(id).then(element => {
        if (element) {
            return response.json(element)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/elements/:id', (request, response, next) => {
    const { id } = request.params;

    Element.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
})

app.post('/api/elements', (request, response) => {
    const body = request.body

    if (!body.elementName) {
        return response.status(400).json({
            error: "Name element missing"
        })
    }

    const newElement = new Element({
        elementName: body.elementName,
        elementReference: body.elementReference,
        elementDescription: body.elementDescription,
        elementUbication: body.elementUbication,
        elementCompanyId: body.elementCompanyId,
        elementAreaId: body.elementAreaId,
        elementUpkeepId: body.elementUpkeepId,
        elementActive: true,
    })

    newElement.save().then(savedElement => {
        response.json(savedElement)
    })
})

app.put('/api/elements/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body;

    const newElementInfo = {
        elementName: body.elementName,
        elementReference: body.elementReference,
        elementDescription: body.elementDescription,
        elementUbication: body.elementUbication,
        elementCompanyId: body.elementCompanyId,
        elementAreaId: body.elementAreaId,
        elementActive: body.elementActive,
    }

    Element.findByIdAndUpdate(id, newElementInfo, {new: true})
        .then(result => {
            response.json(result)
        })
})

// Element Planning
app.get('/api/planning', (request, response) => {
    Planning.find({}).then(planning => {
        response.json(planning)
    })
})

app.get('/api/planning/:id', (request, response, next) => {
    const { id } = request.params;
    Planning.findById(id).then(planning => {
        if (planning) {
            return response.json(planning)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/planning/:id', (request, response, next) => {
    const { id } = request.params;

    Planning.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
})

app.post('/api/planning', (request, response) => {
    const body = request.body

    if (!body.elementPlanningDate) {
        return response.status(400).json({
            error: "Planning Date element missing"
        })
    }

    const newElementPlanning = new Planning({
        elementId: body.elementId,
        elementUpkeepId: body.elementUpkeepId,
        elementPlanningDate: body.elementPlanningDate,
        elementDoDate: body.elementDoDate,
        elementCompanyId: body.elementCompanyId,
        elementUserPlanningId: body.elementUserPlanningId,
        elementUserDoId: body.elementUserDoId,
        elementPlanningValidation: false,
        elementPlanningActive: true,
    })

    newElementPlanning.save().then(savedPlanning => {
        response.json(savedPlanning)
    })
})

app.put('/api/planning/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body;

    const newPlanningInfo = {
        elementId: body.elementId,
        elementUpkeepId: body.elementUpkeepId,
        elementPlanningDate: body.elementPlanningDate,
        elementDoDate: body.elementDoDate,
        elementCompanyId: body.elementCompanyId,
        elementUserPlanningId: body.elementUserPlanningId,
        elementUserDoId: body.elementUserDoId,
        elementPlanningValidation: body.elementPlanningValidation,
        elementPlanningActive: body.elementPlanningActive,
    }

    Planning.findByIdAndUpdate(id, newPlanningInfo, {new: true})
        .then(result => {
            response.json(result)
        })
})

// Upkeep (manteniments)
app.get('/api/upkeeps', (request, response) => {
    Upkeep.find({}).populate("upkeepTypeId").populate("upkeepCompanyId")
    .then(upkeep => {
        response.json(upkeep)
    })
})

app.get('/api/upkeeps/:id', (request, response, next) => {
    const { id } = request.params;
    Upkeep.findById(id).then(upkeep => {
        if (upkeep) {
            return response.json(upkeep)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/upkeeps/:id', (request, response, next) => {
    const { id } = request.params;

    Upkeep.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
})

app.post('/api/upkeeps', (request, response) => {
    const body = request.body

    if (!body.upkeepName) {
        return response.status(400).json({
            error: "Upkeep name missing"
        })
    }

    const newUpkeep = new Upkeep({
        upkeepName: body.upkeepName,
        upkeepDescription: body.upkeepDescription,
        upkeepTypeId: body.upkeepTypeId,
        upkeepCompanyId: body.upkeepCompanyId,
        upkeepActive: true,
    })

    newUpkeep.save().then(savedUpkeep => {
        response.json(savedUpkeep)
    })
})

app.put('/api/upkeeps/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body;

    const newUpkeepInfo = {
        upkeepName: body.upkeepName,
        upkeepDescription: body.upkeepDescription,
        upkeepTypeId: body.upkeepTypeId,
        upkeepCompanyId: body.upkeepCompanyId,
        upkeepActive: body.upkeepActive,
    }

    Upkeep.findByIdAndUpdate(id, newUpkeepInfo, {new: true})
        .then(result => {
            response.json(result)
        })
})

// Upkeep Type (tipus manteniments)
app.get('/api/upkeepstypes', (request, response) => {
    Upkeeptype.find({}).then(upkeeptype => {
        response.json(upkeeptype)
    })
})

app.get('/api/upkeepstypes/:id', (request, response, next) => {
    const { id } = request.params;
    Upkeeptype.findById(id).then(upkeeptype => {
        if (upkeeptype) {
            return response.json(upkeeptype)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/upkeepstypes/:id', (request, response, next) => {
    const { id } = request.params;

    Upkeeptype.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
})

app.post('/api/upkeepstypes', (request, response) => {
    const body = request.body

    if (!body.upkeepTypeName) {
        return response.status(400).json({
            error: "Upkeep type name missing"
        })
    }

    const newUpkeepType = new Upkeeptype({
        upkeepTypeName: body.upkeepTypeName,
        upkeepTypeUnits: body.upkeepTypeUnits,
        upkeepTypeCompanyId: body.upkeepTypeCompanyId,
        upkeepTypeActive: true,
    })

    newUpkeepType.save().then(savedUpkeepType => {
        response.json(savedUpkeepType)
    })
})

app.put('/api/upkeepstypes/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body;

    const newUpkeepTypesInfo = {
        upkeepTypeName: body.upkeepTypeName,
        upkeepTypeUnits: body.upkeepTypeUnits,
        upkeepTypeCompanyId: body.upkeepTypeCompanyId,
        upkeepTypeActive: body.upkeepTypeActive,
    }

    Upkeeptype.findByIdAndUpdate(id, newUpkeepTypesInfo, {new: true})
        .then(result => {
            response.json(result)
        })
})

// Usuaris
app.get('/api/users', (request, response) => {
    User.find({}).populate("userCompanyId")
    .then(users => {
        response.json(users)
    })
})

app.get('/api/users/:id', (request, response, next) => {
    const { id } = request.params;
    User.findById(id).then(user => {
        if (user) {
            return response.json(user)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/users/:id', (request, response, next) => {
    const { id } = request.params;

    User.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
})

app.post('/api/users', (request, response) => {
    const body = request.body

    if (!body.userDNI) {
        return response.status(400).json({
            error: "DNI user missing"
        })
    }

    const newUser = new User({
        userName: body.userName,
        userLastName1: body.userLastName1,
        userLastName2: body.userLastName2,
        userDNI: body.userDNI,
        userEmail: body.userEmail,
        userUser: body.userUser,
        userPassword: body.userPassword,
        userCompanyId: body.userCompanyId,
        userActive: true,
    })

    newUser.save().then(savedUser => {
        response.json(savedUser)
    })
})

app.put('/api/users/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body;

    const newUserInfo = {
        userName: body.userName,
        userLastName1: body.userLastName1,
        userLastName2: body.userLastName2,
        userDNI: body.userDNI,
        userEmail: body.userEmail,
        userUser: body.userUser,
        userPassword: body.userPassword,
        userCompanyId: body.userCompanyId,
        userActive: body.userActive,
    }

    User.findByIdAndUpdate(id, newUserInfo, {new: true})
        .then(result => {
            response.json(result)
        })
})

// Middleware
app.use((error, request, response, next) => {
    console.error(error);
    if (error.name == 'CastError') {
        response.status(400).send({error: 'id used is malformed'})
    } else {
        response.status(500).end()
    }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servei running on port ${PORT}`);
})

