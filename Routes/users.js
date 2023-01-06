const express = require('express')
const router = express.Router()
const {
    Register,
    Login
} = require("../controllers/users")

router.route("/login").post(Login)
router.route('/register').post(Register)

module.exports = router
