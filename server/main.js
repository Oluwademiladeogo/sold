const express = require("express")
const app = express()
const mongoose = require("mongoose")
const winston = require("winston")
const session = require("express-session")
const joi = require("joi")
var path = require('path')
const { MongoClient } = require('mongodb');
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser")
//using static folder
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//set view engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public'))); // Serve the "public" folder as a static directory

//connect flash
var flash = require('connect-flash');
app.use(flash());

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

// express session 
app.set('trust proxy', 1) // trust first proxy


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    dbName: 'SOLD',
    collectionName: 'sessions'
  }),
  cookie: { name: 'newname', secure: true,  maxAge: null , rolling: false }
}));
app.use(cookieParser('keyboard cat'));



app.use("/", require("./routes/index"))
app.use("/aboutus", require("./routes/aboutus"))
app.use("/cart", require("./routes/cart"))
app.use("/dashboard", require("./routes/dashboard"))
app.use("/login", require("./routes/login"))
app.use("/signup", require("./routes/signup"))
app.use("/logout", require("./routes/logout"))
app.use("/checkout", require("./routes/checkout"))
app.use("/admin/pages", require("./routes/adminpages"))


require("./logging.js")()





