let errorHandler = (err, req, res, next) =>{
    console.log('Application Error Handler Called')
    console.log(err)
    res.send('Some Error Occured!')
}//End IP Logger Function

let notFoundHandler = (req,res,next) =>{
    console.log('Global Not Found Handler Called')
    res.status(404).send('Route Not Found in the Application')
} //End Not Found Handler

module.exports ={
    errorHandler: errorHandler,
    notFoundHandler: notFoundHandler
}