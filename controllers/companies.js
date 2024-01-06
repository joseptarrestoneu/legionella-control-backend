const Companies = require('../models/Companies')

// GET ALL COMPANIES
const getAllCompanies = (request, response) => {
    Companies.find({}).then(Companies => {
        response.json(Companies)
    })
}

// GET COMPANY BY ID
const getCompanyById = (request, response, next) => {
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
}

// DELETE COMPANY
const deleteCompany = (request, response, next) => {
    const { id } = request.params;

    Companies.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
}

// POST COMPANY
const postCompany = (request, response) => {
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
}

// PUT COMPANY
const putCompany = (request, response, next) => {
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
}

module.exports = { getAllCompanies, getCompanyById, deleteCompany, postCompany, putCompany }