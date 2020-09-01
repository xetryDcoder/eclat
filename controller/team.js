const Team = require("../model/team")
const bcrypt = require("bcryptjs")
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const path = require('path');

/* @Display Team list */
exports.getTeamList = (req, res, next) => {
    Team.find()
    .then(members => {
        console.log('working')
        res.render('team/team-list', {
            member: members
        })
    })
    
}

/* @Display Team Create */
exports.getTeamCreate = (req, res, next) => {
    let message = req.flash('message')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    res.render('team/team-create', {
        teamMessage: message
    })
}

/* @Submit Team Create */
exports.postTeamCreate = (req, res, next) => {
    const {email} = req.body
    Team.findOne( {email}, (error, regTeam) => {
        if(regTeam) {
            req.flash('message', 'Team member in Role')
            res.redirect('/team-create')
        } else {
            Team.create({
                ...req.body,
            }, (error) => {
                if (error) {
                    console.log(error)
                    req.flash('message', 'Opps, Something went wrong')
                    return res.redirect('/team-create')
                }

                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'ceramiclove3@gmail.com',
                        pass: 'l10nh3art'
                    }
                });

                /* transporter.use('compile', hbs({
                    viewEngine: 'express-handlebars',
                    viewPath: '../views'
                })); */

                var name="Hommies"
                var position = req.body.position
                var email= req.body.email
                var password = req.body.password
                
                let mailOptions = {
                    from: 'ceramiclove3@gmail.com',
                    to: 'hemantajungkarki@gmail.com',
                    subject: 'Test',
                    html: '<h1>Hello '+ name + '</h1><hr><p>We are so glad to include you as our team member. You have been sucessfully registered as a Team Member with Email '
                            + email + 'and on a position of ' + position + '. Hope you enjoy! <br><br>login details: <br>id: '+ email +'<br>password: '
                            + password + '<br>Data shared hereby are company property. you are neither allowed to share or distribute or forward this Message. If any such cases are found then legal action are taken.<br>Thank You!' 
                };
                
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error.message);
                    }
                    console.log('success');
                });
                res.redirect('/team-list')
            })
        }
    })
}

/* @Dispaly team login */
exports.getTeamLogin = (req, res, next) => {
    let message = req.flash('message')
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    res.render('team/login',{
        teamMessage: message
    })
}

/* @Submit team login */
exports.postTeamLogin = (req, res, next) => {
    const {email, password} = req.body
    
    Team.findOne({email}, (error, team) => {
        if(team) {
            bcrypt.compare(password, team.password, (error, same) => {
                if(same) {
                    req.session.teamId =  team._id
                    console.log(req.session.teamId)
                    res.send('Loged In')
                } else {
                    req.flash('message', 'Invalid Id/Password')
                    console.log('hello1')
                    res.redirect('/team/login')
                }
            })
        } else {
            req.flash('message', 'User Not found')
            console.log('hello2')
            res.redirect('/auth/login')
        }
    })
}