const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    teamId: {
      type: String,
      required: true
    },
    task: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
