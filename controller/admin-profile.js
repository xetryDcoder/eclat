const Profile = require('../model/admin-profile')
const User = require('../model/user')
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
    let message = req.flash('message')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    
    User.findById(req.session.userId)
    .then(user => {
      console.log(user)
        return res.render('admin/edit-profile', {
          user,
          errorMessage: message
        })
    })
    .catch(error => console.log(error))
  }

/* @submit Edit page */
exports.postEditProfile = (req, res, next) => {
    const {dp} = req.files
    const {email} = req.body
    console.log(email)
    const uploadPath = path.resolve(__dirname, '..', 'public/uploads/profile', dp.name)
    
    Profile.findOne({email: email}, (error, profile) => {
        if(!profile) {
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
                   return res.redirect('/')
        
                })
            })
        } else {
            req.flash('message', 'Profile Already Exist')
            return res.redirect('/admin/edit-profile')
        }
    })
}



