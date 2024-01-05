const express = require('express')
const router = express.Router()
const {dynamicLinks} = require('../controllers/loginController')


router.route('/:username/:emailshortened').get(dynamicLinks)

module.exports = router