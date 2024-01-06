const express = require('express')
const router = express.Router()

const companiesController = require('../controllers/companies')

// GET COMPANIS
router.get('/', companiesController.getAllCompanies)

// GET COMPANY BY ID
router.get('/:id', companiesController.getCompanyById)

// POST COMPANY
router.post('/', companiesController.postCompany)

// PUT COMPANY
router.put('/:id', companiesController.putCompany)

// DELETE COMPANY
router.delete('/:id', companiesController.deleteCompany)

module.exports = router