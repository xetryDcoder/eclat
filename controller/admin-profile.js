const Profile = require('../model/admin-profile')
const path = require('path')

/* @display profile page */
exports.getAdminProfile = (req, res, next) => {
    Profile.find({adminId : req.session.userId})
    .then(profiles => {
        res.render('admin/profile', {
            profile: profiles,
        })
    })
    .catch(err => console.log(err))
}

/* @display edit page */
exports.getEditProfile = (req, res, next) => {
    res.render('admin/edit-profile')
}

/* @submit Edit page */
exports.postEditProfile = (req, res, next) => {
    const {dp} = req.files
    const uploadPath = path.resolve(__dirname, '..', 'public/uploads/profile', dp.name)

    dp.mv(uploadPath, (error) => {
        Profile.create({
            ...req.body,
            dp: `/uploads/profile/${ dp.name }`,
            adminId: req.session.userId
            
        }, (error, admin) => {
            if(error) {
               return res.send(error)
            }
            req.session.dp = uploadPath.slice(49)
            console.log(req.session.dp)
            res.send('success')

        })
    })

}



