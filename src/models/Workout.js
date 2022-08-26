const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lifts: [{
      liftId: Number,
      sets: Number,
      reps: Number
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
  })

  const Workout = mongoose.model('Workout', workoutSchema);

  module.exports = Workout;