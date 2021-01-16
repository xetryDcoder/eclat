const express = require('express')

const adminController = require('../controller/admin')

const router = express.Router();

const authMiddleware = require('../middleware/auth')
const adminProfileMiddleware = require('../middleware/adminProfile')

/* @Get Routes */
router.get('/', authMiddleware,  adminController.getDashboard)
router.get('/add-Project', authMiddleware,  adminController.getAddProject)
router.get('/project-list', authMiddleware,  adminController.getProjectList)
/* router.get('/all-dev/:id', authMiddleware,  adminController.getAllDev) */

/* @Post Routes */
router.post('/add-Project', authMiddleware, adminController.postAddProject)
router.post('/putDevAssign', adminController.putDevAssign)

module.exports = router;