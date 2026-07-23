require("dotenv").config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
async function connectDB(){
    try{
        const conn = await mongoose.connect(uri);
        console.log("The MongoDB Server Started !!")
    }
    catch(err){
        console.log("Error : ",err.message)
    }
}

module.exports = connectDB;
