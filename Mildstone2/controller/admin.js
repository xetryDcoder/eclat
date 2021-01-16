const Admin = require('../model/admin')
const Profile = require('../model/admin-profile')
const Team = require('../model/team')
const path = require('path')
const bodyParser = require('body-parser')
const team = require('../model/team')

/* @displaying add Dashboard page */
exports.getDashboard = (req, res, next) => {
    Profile.findOne({adminId : req.session.userId}, (error, profile) => {
        res.render('admin/dashboard', {
            profile
        })
    })
}

/* @displaying add project page */
exports.getAddProject = (req, res, next) => {
    res.render('admin/add-project')
}

/* @submit add project page */
exports.postAddProject = (req, res, next) =>  {
    const {logo} = req.files
    const uploadPath = path.resolve(__dirname, '..', 'public/uploads/logo', logo.name)
    logo.mv(uploadPath, (error) => {
        Admin.create({
            ...req.body,
            logo: `/uploads/logo/${ logo.name }`,
        }, (error, admin) => {
            if(error) {
                return res.redirect('/')
            }
            console.log('Added to database')
            res.redirect('/')
        })
    })
}

/*@display project list*/
exports.getProjectList = (req, res, next) => {
    Admin.find()
    .then(admins => {
        res.render('admin/project-list', {
            mngr: admins,
        })
    })
    .catch(err => console.log(err))
}

/* @display all developers */
exports.getAllDev = (req, res, next) => {
    res.render('admin/all-dev')
}

/*@Submit assign project to developer */
exports.putDevAssign = (req, res, next) => {
    const {projectId, teamId} = req.body

    Team.findById(teamId)
    .then(result => {
        if(result.project.length == 0 ) {
            Team.findByIdAndUpdate(teamId, {$push: { project : projectId } }, { new: true }).populate('project')
                    .then(result => {
                        res.redirect('/Assigned-Developer/' + teamId)
                    })
                    .catch(err => console.log(err))
        } else {
            for(let i = 0; i < result.project.length; i++) {
                if( projectId == result.project[i] ) {  
                    req.flash('message', 'Already Assigned')
                    return res.redirect('/Assigned-Developer/' + teamId)  // project already in list
                }
            }
            // if code reached here, project not in current project list, must add it
            Team.findByIdAndUpdate(teamId, {$push: { project : projectId } }, { new: true }).populate('project')
            .then(result => {
                return res.redirect('/Assigned-Developer/' + teamId)
            })
            .catch(err => console.log(err))
            }
        })
    .catch(err => console.log)
}

    /* Team.findById(teamId)
    .then(result => {
        for(let i = 0; i < result.project.length; i ++) {
            let dbProjectId = result.project[i]
            if( projectId == dbProjectId ) {
                console.log('id already Used found')
            } else {
                console.log('New Id Added')
                Team.find({project: dbProjectId})
                .then(result=> {
                    Team.findByIdAndUpdate(teamId, {$push: { project : projectId } }, { new: true }).populate('project')
                    .then(result => {
                        console.log('here it is')
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            }
        }
    })
    .catch(err => console.log(err)) */
    
    /* Team.findByIdAndUpdate(teamId, {$push: { project : projectId } }, { new: true }).populate('project')
    .then(result => {
        res.render('team/project-list', {
            result: result.project,
            member: result
        })
    })
    .catch(err => console.log(err)) */


/*@Display assign project to developer */
exports.getDevAssign = (req, res, next) => {
    let message = req.flash('message')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    teamId = req.params.id
    Team.findById(teamId).populate('project')
    .then(result => {
        res.render('team/project-list', {
            result: result.project,
            member: result,
            message
        })
    })
}

/* @Display Team list */
exports.getTeamList = (req, res, next) => {
    let message = req.flash('message')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    Team.find({}).populate('project')
    .then(result => {
        const length = result.length
        for (let i = 0; i< length; i++) {
            devList = result[i]
            console.log(devList)
        }
        res.render('team/list', {
            devList,
            result,
            message
        })
    })
    .catch(err => console.log(err))
}