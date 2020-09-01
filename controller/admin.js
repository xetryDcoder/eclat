const Admin = require('../model/admin')
const Profile = require('../model/admin-profile')
const path = require('path')
const bodyParser = require('body-parser')

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