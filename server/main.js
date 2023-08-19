require('dotenv').config();
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const winston = require("winston")
const session = require("express-session")
const joi = require("joi")
var path = require('path')
const cookieParser = require("cookie-parser")


app.use(express.static(path.join(__dirname, 'public'))); // Serve the "public" folder as a static directory
//using static folder
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//set view engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//connect flash
var flash = require('connect-flash');
app.use(flash());

// express session 
app.set('trust proxy', 1) // trust first proxy

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//mongo connection
const uri = "mongodb://localhost/SOLD"
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(()=>{
      console.log("Connected to Mongodb");
    winston.info("Connected to Mongodb");
  })

//port connection
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Connected, server listening on port ${port}`)
    winston.info(`Connected, server listening on port ${port}`)
})

app.use("/", require("./routes/index"))
app.use("/aboutus", require("./routes/aboutus"))
app.use("/cart", require("./routes/cart"))
app.use("/dashboard", require("./routes/dashboard"))
app.use("/login", require("./routes/login"))
app.use("/signup", require("./routes/signup"))
app.use("/logout", require("./routes/logout"))
app.use("/checkout", require("./routes/checkout"))
app.use("/admin/pages", require("./routes/adminpages"))
app.use("/editprofile", require("./routes/editprofile"))
//if none of them works out, error occurs
// app.use(error)
require("./logging.js")()






