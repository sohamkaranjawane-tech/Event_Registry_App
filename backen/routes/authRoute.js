const express = require('express');
const authRoute = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {signIn , login , getProfile , getUser , getAllUser} = require('../controllers/authController');

authRoute.post('/signIn', signIn)
authRoute.post("/login", login)
authRoute.get('/getUser/:id',authMiddleware,getUser)
authRoute.get('/profile',authMiddleware,getProfile)
authRoute.get('/getAllUser',authMiddleware,getAllUser)
module.exports = authRoute;