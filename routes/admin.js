const express = require('express')

const adminController = require('../controller/admin')

const router = express.Router();

const authMiddleware = require('../middleware/auth')
const adminProfileMiddleware = require('../middleware/adminProfile')

/* ------------------------------- */
/* @Get Routes */

/* @Dashboard */
router.get('/', authMiddleware,  adminController.getDashboard)

/* Project Routes */
router.get('/add-Project', authMiddleware,  adminController.getAddProject)
router.get('/project-list', authMiddleware,  adminController.getProjectList)

/* @Team Routes */
router.get('/Assigned-Developer/:id', adminController.getDevAssign)
router.get('/team-list', adminController.getTeamList)


/* ------------------------------- */
/* @Post Routes */

/* @Project */
router.post('/add-Project', authMiddleware, adminController.postAddProject)

/* @Developer */
router.post('/Assigned-Developer', adminController.putDevAssign)


/* @Delete Routes */

/* @Project */
router.get("/project/:id", authMiddleware, adminController.deleteProject);

module.exports = router;