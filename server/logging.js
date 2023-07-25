require("express-async-errors")
const winston = require("winston")
//require("winston-mongodb")
module.exports = function(){
process.on("uncaughtException", (ex)=>{
    winston.error(ex.message, ex)
    new winston.transports.Console({colorize: true, prettyPrint: true})
})
process.on("unhandledRejection", (ex)=>{
    throw ex;
    
})

//logging messages in a file
winston.add(new winston.transports.File({ filename: 'logfile.log' }))
// winston.add(new winston.transports.MongoDB('mongodb://localhost:27017/'))

}
