const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    pName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    advance: {
        type: Number,
        required: true
    },
    logo: {
        type: String,
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    cName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    info :{
        type: String
    },
    dev: [{
        type: Schema.Types.ObjectId,
        ref:'Team'
    }]
    /* ,
    docs: {
        type: Array
    } */


}, {
    timestamps:true
})

module.exports = mongoose.model('Admin',adminSchema)