const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const flash = require('connect-flash');
const fileUpload = require('express-fileupload')

const Admin = require('./model/admin')

const app = express()

mongoose.connect("mongodb://localhost/PMS", { useFindAndModify: false })

app.set('view engine', 'ejs');
app.set('views', 'views');

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(flash())
app.use(fileUpload())

const adminRoutes = require('./routes/admin')
const authRoutes = require('./routes/auth')
const teamRoutes = require('./routes/team')
const adminProfileRoutes = require('./routes/admin-profile')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(adminRoutes)
app.use(authRoutes)
app.use(teamRoutes)
app.use(adminProfileRoutes)



app.listen(3000, () => {
    console.log('server running on port 3000')
})