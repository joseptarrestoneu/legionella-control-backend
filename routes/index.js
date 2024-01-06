var express = require('express')
var router = express.Router()

const companiesRoutes = require('./companies')

router
    .use("/companies", companiesRoutes)