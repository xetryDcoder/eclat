const Profile = require('../model/admin-profile')

module.exports = (req, res, next) => {
    Profile.findOne({ adminId : req.session.userId })
    .then(profile => {
      if(!profile) {
        return res.redirect('/admin/edit-profile')
      }
    })
    next()
}
