const express = require('express')
const { getUser } = require('../../controllers/v1/users')

//  Initialize express router
const router = express.Router()

//  Routes on /
router.route('/').get(getUser)

module.exports = router
