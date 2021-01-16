const express = require('express')

const adminProfileController = require('../controller/admin-profile')

const router = express.Router();

/* @Get Routes */
router.get('/admin/profile', adminProfileController.getAdminProfile)
router.get('/admin/edit-profile', adminProfileController.getEditProfile)

/* @Post router */
router.post('/admin/edit-profile', adminProfileController.postEditProfile)

module.exports = router