const User =  require('../model/user')
const Profile =  require('../model/admin-profile')
const bcrypt = require('bcryptjs')

/* @displaying Login page */
exports.getLogin = (req, res, next) => {
    let message = req.flash('message')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    res.render('auth/login', {
        errorMessage: message
    })
}

/* @submit Login page */
exports.postLogin = (req, res, next) => {
    const {email, password} = req.body

    User.findOne({email}, (error, login) => {
        if(login) {
            bcrypt.compare(password, login.password, (error, same) => {
                if(same) {
                    /* Profile.findOne({adminId : req.session.userId}, (error, profile) => {
                        if(!profile) {
                            console.log('no profile')
                        } else {
                            console.log(profile)
                            console.log('Yes profile') 
                        }
                    }) */
                    req.session.userId = login._id
                    res.redirect('/')
                } else {
                    req.flash('message', 'Invalid Id Password')
                    res.redirect('/auth/login')
                }
            })
        } else {
            req.flash('message', 'User Not found')
            res.redirect('/auth/login')
        }
    })
}

/*@dispaly Register Page*/
exports.getRegister = (req, res, next) => {
    res.render('auth/register')
}

/*@Submit Register Page*/
exports.postRegister = (req, res, next) => {
    const {email, password} = req.body
    User.findOne( {email}, (error, register) => {
        if(register) {
            res.redirect('/auth/register')
        } else {
            User.create({
                ...req.body,
            }, (error) => {
                if(error) {
                    console.log(error)
                    return res.redirect('/auth/register')
                }
                res.redirect('/auth/login')
            })
        }
    }) 
}

/*@logout*/
exports.getLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
}