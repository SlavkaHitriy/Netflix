const { Router } = require('express')
const router = Router()

const { register, login, forgotPass, resetPass } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/forgot-password', forgotPass)
router.put('/reset-password/:resetToken', resetPass)

module.exports = router