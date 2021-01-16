const express = require('express')

const teamController = require('../controller/team');
const team = require('../model/team');

const authMiddleware = require('../middleware/auth')

const router = express.Router();

/* @Get*/
router.get('/team-list/:id', authMiddleware, teamController.getTeamListWithId )
/* router.get('/team-list', authMiddleware, teamController.getTeamList ) */
router.get('/team-create',authMiddleware, teamController.getTeamCreate )
router.get('/team/login', teamController.getTeamLogin)
router.get("/team-dashboard", teamController.getTeamDashboard);


/*@post */
router.post('/team-create', authMiddleware, teamController.postTeamCreate)
router.post('/team/login',  teamController.postTeamLogin)

module.exports = router
