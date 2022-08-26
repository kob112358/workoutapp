const mongoose = require('mongoose');
const {MUSCLE_GROUPS} = require('../express/env.js');

const liftSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
    },
    url: String,
    notes: String,
    primary: [{
      type: String,
      enum: MUSCLE_GROUPS
    }],
    secondary: [{
        type: String,
        enum: MUSCLE_GROUPS
    }],
    whoCreated: {
      type: String,
      trim: true,
      required: true,
    },
    whenCreated: {
      type: Date,
      required: true,
    },
    whoUpdated: {
      type: String,
      trim: true,
    },
    whenUpdated: {
      type: Date,
    },
    version: Number,
    isActive: {
      type: Boolean,
      default: true,
    },
  });

const Lift = mongoose.model("Lift", liftSchema);


module.exports = Lift;