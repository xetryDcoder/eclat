const Profile = require('../model/admin-profile')
const User = require('../model/user')

module.exports = (req, res, next) => {
  User.findById(req.session.userId)
  .then(user => {
    console.log(user)
      return res.render('admin/edit-profile', {
        user
      })
  })
  .catch(error => console.log(error))
}

/* module.exports = (req, res, next) => {
    Profile.findOne({ adminId : req.session.userId })
    .then(profile => {
      if(!profile) {
        return res.redirect('/admin/edit-profile')
      }
    })
    next()
} */


/* module.exports = (req, res, next) => {
    Profile.findOne({ adminId : req.session.userId })
    .then(profile => {
      if(!profile) {
        Admin.findById(req.session.userId, (admin, error) => {
          console.log(admin)
          return res.render('admin/edit-profile', {
            admin
          })
        })
      }
    })
    next()
} */