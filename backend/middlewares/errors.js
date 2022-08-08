const ErrorHandler = require('../utils/errorHandler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    if(process.env.ENVIRONMENT === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })
    }
    if(process.env.ENVIRONMENT === 'PRODUCTION'){
        let error = {...err}
        error.message=err.message

        if(err.name==="CastError"){
            const message = `Resource not found. Invalid : ${err.path}`
            error = new ErrorHandler(message,400)
        }
        if(err.name==="ValidationError"){
            const message = Object.values(err.errors).map(value=>value.message)
            error = new ErrorHandler(message,400)
            }
        // handling mongoose duplicate key errors
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered  `
            error = new ErrorHandler(message,400)
        }
        // handling wrong jwt error
        if (err.name === 'JsonWebTokenError'){
            const message = `json web token is invalid. try again !!`
            error = new ErrorHandler(message,400)
        }
        // handling expired jwt error
        if(err.name === 'TokenExpiredError'){
            const message = 'json web token is expired. try again !!';
            error = new ErrorHandler(message,400)
        }
        res.status(error.statusCode).json({
            success:false,
            message:err.message || 'Internal Server Error'
        })

    }
    res.status(err.statusCode).json(
        {
            success:false,
            message: err.message,
        }
    )
}
