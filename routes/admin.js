const express = require('express')

const adminController = require('../controller/admin')

const router = express.Router();

const authMiddleware = require('../middleware/auth')
const adminProfileMiddleware = require('../middleware/adminProfile')

/* @Get Routes */
router.get('/', authMiddleware, adminProfileMiddleware, adminController.getDashboard)
router.get('/add-Project', authMiddleware, adminProfileMiddleware, adminController.getAddProject)
router.get('/project-list', authMiddleware, adminProfileMiddleware, adminController.getProjectList)
router.get('/all-dev', authMiddleware, adminProfileMiddleware, adminController.getAllDev)

/* @Post Routes */
router.post('/add-Project', authMiddleware, adminController.postAddProject)

module.exports = router;