//importing stuff
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connectDB = require("./db/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
//Importing Routes
const authRoute = require('./routes/authRoute');
const eventRoute = require('./routes/eventRoute');
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://event-registry-app.vercel.app",
    credentials: true
}));

//Usage of Routes
app.use('/authRoute',authRoute);
app.use('/eventRoute',eventRoute);


//db Calling
connectDB();

//port listening
app.listen(PORT, () => {
    console.log(`Server Started At port : ${PORT}`);
});