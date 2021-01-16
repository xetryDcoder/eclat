const express = require('express')

const authController = require('../controller/auth')

const router = express.Router();


/* @Get Routes */
router.get('/auth/login', authController.getLogin)
router.get('/auth/register', authController.getRegister)
router.get('/auth/logout',authController.getLogout)

/* @Post Routes */
router.post('/auth/login', authController.postLogin)
router.post('/auth/register', authController.postRegister)


module.exports = router

