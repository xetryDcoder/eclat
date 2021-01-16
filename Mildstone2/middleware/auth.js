const User = require('../model/user')

module.exports = (req, res, next) => {
    User.findById(req.session.userId, (error, login) => {
        if(error || !login) {
            return res.redirect('/auth/login')
        }
        next()
    })
}