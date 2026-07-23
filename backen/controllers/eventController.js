const { eventModel } = require("../models/eventModel");
const { userModel } = require("../models/userModel");
require("dotenv").config();

async function getEvents(req, res) {
  try {
    await eventModel.deleteMany({
      eventDate:{
        $lt: new Date(),
      },
    })
    const events = await eventModel.find();
    console.log("Events Fetched");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function postEvent(req, res) {
  try {
    const {
      name,
      description,
      imgSrc,
      eventDate,
      registrationDeadline,
      venue,
      eventType,
      createdBy,
      status,
    } = req.body;

    if (
      !name ||
      !description ||
      !imgSrc ||
      !eventDate ||
      !registrationDeadline ||
      !venue ||
      !createdBy
    ) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const newEvent = await eventModel.create({
      name,
      description,
      imgSrc,
      eventDate,
      registrationDeadline,
      venue,
      eventType,
      createdBy,
      status,
    });

    res.status(201).json({
      message: "Event Created Successfully!",
      event: newEvent,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function addEvents(req, res) {
  try {
    const userId = req.params.id;
    const { registerEvent } = req.body;

    if (!registerEvent) {
      return res.status(400).json({
        message: "Event ID is required.",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found.",
      });
    }

    const event = await eventModel.findById(registerEvent);

    if (!event) {
      return res.status(404).json({
        message: "Event Not Found.",
      });
    }

    const alreadyRegistered = user.registeredEvents.some(
      (eventId) => eventId.toString() === registerEvent,
    );

    if (alreadyRegistered) {
      return res.status(400).json({
        message: "You have already registered for this event.",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          registeredEvents: registerEvent,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    const updatedEvent = await eventModel.findByIdAndUpdate(
      registerEvent,
      {
        $addToSet: {
          registeredStudents: userId,
        },
      },
      {
        new: true,
      },
    );
    console.log(updatedEvent);

    res.status(200).json({
      message: "Event Registered Successfully!",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getUsersRegistered(req,res){
    try{
        const id = req.params.id;
        const event = await eventModel.findById(id).populate("registeredStudents");
        if(!event){
            return res.status(404).json({
                message:"Event Not Found"
            });
        }
        res.status(200).json({
            users:event.registeredStudents
        });
    }
    catch(err){
        return res.status(500).json({
            message:err.message,
        })
    }
}

module.exports = {
  getEvents,
  postEvent,
  addEvents,
  getUsersRegistered,
};
