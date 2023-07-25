const express = require("express")
const app = express()
const mongoose = require("mongoose")
const winston = require("winston")
const session = require("express-session")
const joi = require("joi")
var path = require('path')
// const cookieParser = require("cookie-parser")
//using static folder
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//set view engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//connect flash
var flash = require('connect-flash');

 
// app.set(()=>{
// //   app.use(cookieParser('keyboard cat'));
//   app.use(express-session({ cookie: { maxAge: 60000 }}));
//   app.use(flash());
// });


const pages = require("./routes/pages")
const adminpages = require("./routes/adminpages.js")
app.use("/", pages)
app.use("/admin/pages", adminpages)

//express session 
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// }))

const log = require("./logging.js")
log()





//mongo connection
const uri = "mongodb://localhost/SOLD"
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(console.log("Connected to mongodb"))

//port connection
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Connected, server listening on port ${port}`)
})