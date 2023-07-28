const express = require("express")
const app = express()
const mongoose = require("mongoose")
const winston = require("winston")
const session = require("express-session")
const joi = require("joi")
var path = require('path')
const cookieParser = require("cookie-parser")
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
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true,  maxAge: 60000 }
}))
app.use(cookieParser('keyboard cat'));



const adminpages = require("./routes/adminpages.js")
app.use("/", require("./routes/index"))
app.use("/aboutus", require("./routes/aboutus"))
app.use("/cart", require("./routes/cart"))
app.use("/login", require("./routes/login"))
app.use("/signup", require("./routes/signup"))


app.use("/admin/pages", adminpages)


require("./logging.js")()





//mongo connection
const uri = "mongodb://localhost/SOLD"
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(console.log("Connected to Mongodb"))
    .then(winston.info("Connected to Mongodb"))

//port connection
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Connected, server listening on port ${port}`)
    winston.info(`Connected, server listening on port ${port}`)
})