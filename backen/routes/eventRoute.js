const express = require('express');
const eventRoute = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {getEvents , postEvent , addEvents , getUsersRegistered} = require('../controllers/eventController');

eventRoute.get('/getEvent',authMiddleware, getEvents)
eventRoute.post('/postEvent',authMiddleware,postEvent);
eventRoute.put('/addEvent/:id',authMiddleware,addEvents);
eventRoute.get('/getUsersRegistered/:id',authMiddleware,getUsersRegistered)
module.exports = eventRoute;