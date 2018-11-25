const express = require('express') //Imported Express
const appConfig = require('./config/appConfig') //Import Config
const fs = require('fs') //Import FS file to read the File
const mongoose = require('mongoose') //Import Mongoose
const cookieParser = require('cookie-parser') //Import Cookie Parser
const bodyParser = require('body-parser') //Import Body Parser
const globalMiddleware = require('./middlewares/appErrorHandlerMiddleware')
const routeLoggerMiddleware = require('./middlewares/routeLogger')
const app = express() //Create Intsance of Express

//Third-party middleware
app.use(bodyParser.json()) //for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())
//End Third-party middleware

//Application Level Middleware

app.use(globalMiddleware.errorHandler)
app.use(routeLoggerMiddleware.requestIpLogger)

//End Application Level Middleware

//Bootstrap Model
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) require(modelsPath + '/' + file)                
})//End Bootstrap Model

//Bootstrap Route
let routePath = './route'
fs.readdirSync(routePath).forEach(function (file) {
    if (~file.indexOf('.js')) {        
        let route = require(routePath + '/' + file);
        route.setRouter(app);
    }
});//End Bootstrap Route

//Route Level Middleware

app.use(globalMiddleware.notFoundHandler)

//End Route Level Middleware

app.listen(appConfig.port , () => {
    console.log(`App Running at Port http://localhost:${appConfig.port}`)
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true }) //Connect with Database
})

//Handling Mongoose Connection Error
mongoose.connection.on('error', function (err){
    console.log('Database Connection Error!');
    console.log(err)
})//End To Handling Mongoose Connection Error

//Handling Mongoose Success Event
mongoose.connection.on('open', function (err){
    if(err){
        console.log('Database Error!')
        console.log(err)
    }else
    {
        console.log('Database connection open success :)')
    }
})//ENd To Handling Mongoose Success Event