const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminProfileSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    number: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    dp: {
        type: String,
        required: true
    },
    adminId: {
        type: String,
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
    
    /* ,
    cp: {
        type: String,
        required: true
    } */
})

module.exports = mongoose.model('Adminprofile',adminProfileSchema)