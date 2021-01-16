const Admin = require('../model/admin')
const Profile = require('../model/admin-profile')
const Team = require('../model/team')
const path = require('path')
var nodemailer = require('nodemailer');

const upload = require("../middleware/upload");

/* @displaying add Dashboard page */
exports.getDashboard = (req, res, next) => {
    Admin.find({})
    .then(project => {
        const projectCount = project.length
        console.log(projectCount)
        Profile.findOne({ adminId: req.session.userId }, (error, profile) => {
          res.render("admin/dashboard", {
            profile,
            projectCount
          });
        });
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
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: 'ceramiclove3@gmail.com',
                    pass: '###'
                }
            });
            var pName = req.body.pName
             var cName = req.body.cName
             var advance = req.body.advance
             var totalPrice = req.body.totalPrice
             var category = req.body.category
             var endDate = req.body.endDate
            
            let mailOptions = {
                from: 'ceramiclove3@gmail.com',
                to: 'hemantajungkarki@gmail.com',
                subject: 'Test',
                html: '<h1>Hello Mr/Mrs '+ cName + '</h1><br><hr> <h4>The ' 
                         + pName + ' of type ' + category + ' has been Registered and will be started.<br> The Amount Piad is Rs. '
                         + advance + ' and the deal is done in ' + totalPrice + ' . This Project will be submitted by the date '
                         + endDate + '<br>Thank You for Trustin us..<h4>'
            };
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error.message);
                }
            });
            console.log('Added to database')
            res.redirect('/')
        })
    })
}

/*@display project list*/
exports.getProjectList = (req, res, next) => {
    let message = req.flash("message");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    Admin.find({}).populate('dev')
    .then(admins => {
        res.render('admin/project-list', {
            manager: admins,
            length: admins.length,
            message
        })
        
    })
    .catch(err => console.log(err))
}

/* Delete Project */
exports.deleteProject = (req, res, next) => {
    const projectId = req.params.id
    Admin.findByIdAndDelete(projectId)
    .then(result => {
        req.flash("message", "Deleted Successfully")
        res.redirect('/project-list')
    })
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
                        /* Adding relation to project */
                        /*---*/
                        Admin.findByIdAndUpdate(projectId, {$push: { dev : teamId } }, { new: true })
                        .then(result => {
                            console.log(result)
                            res.redirect('/Assigned-Developer/' + teamId)
                        })
                        .catch(err => console.log(err))
                        /*---*/
                       /*  res.redirect('/Assigned-Developer/' + teamId) */
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
                /* Adding relation to project */
                /*---*/
                Admin.findByIdAndUpdate(projectId, {$push: { dev : teamId } }, { new: true })
                .then(result => {
                    console.log(result)
                    res.redirect('/Assigned-Developer/' + teamId)
                })
                .catch(err => console.log(err))
                /*---*/
                /* return res.redirect('/Assigned-Developer/' + teamId) */
            })
            .catch(err => console.log(err))
            }
        })
    .catch(err => console.log)
}



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

/*@ Search Project list */
