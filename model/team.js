const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const teamSchema = new Schema({
  position: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  project: [
    {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  ],
  todo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

teamSchema.pre('save', function(next) {
    const team = this

    bcrypt.hash(team.password, 10, function (error, encrypted) {
        team.password = encrypted
        next()
    })
}) //hook

module.exports = mongoose.model('Team', teamSchema)