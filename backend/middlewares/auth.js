const User = require('../models/user')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')
// check if user is authenticated or not

exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Login first to access this resource",401))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET,async (err,decoded)=>{
       if(err){
        return next(new ErrorHandler('error in decoding token',500))
       }
       console.log('done');
       req.user = await User.findById(decoded.id);
       next()
    })

})

// handling users roles
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403))
        }
        next();
    }
}