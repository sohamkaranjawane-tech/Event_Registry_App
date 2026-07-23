const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  imgSrc: {
    type: String,
    required: true,
  },

  eventDate: {
    type: Date,
    required: true,
  },

  registrationDeadline: {
    type: Date,
    required: true,
  },

  venue: {
    type: String,
    required: true,
    trim: true,
  },

  eventType: {
    type: String,
    enum: ["technical", "cultural", "sports", "fun", "academics", "others"],
    required: true,
    default: "academics",
  },

  createdBy: {
    type: String,
    ref: "user",
    required: true,
  },

  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
  registeredStudents: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const eventModel = model("event", eventSchema);

module.exports = { eventModel };
