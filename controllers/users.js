
const Model = require('../models/users')
const {StatusCodes} = require('http-status-codes')

const Register = async(req,res) => {
    console.log(req.body);
    const Task = await Model.create({...req.body});
    const token = await Task.createJWT()
    res.status(200).json({
        msg : "You have Registered Successfully",
        Account : Task.toJSON(),
        Token : `${token}`
    })
}

const Login = async(req,res,next)=> {
    const {email,password} = req.body
    if(!email || !password) {
        const error = new Error("Please Enter Your Email and Password")
        error.statusCode = StatusCodes.FORBIDDEN
        next(error)
    }
    const Task = await Model.findOne({email:email})
    if(!Task) {
        const error = new Error("You Don't Have an Account please Register !!!")
        error.statusCode = StatusCodes.BAD_REQUEST
        next(error)
    }

    const correctPassword = await Task.IsPassword(password)
    if(!correctPassword) {
        const error = new Error("You entered An Incorrect Password")
        error.statusCode = StatusCodes.BAD_REQUEST
        next(error)
    }

    const token = await Task.createJWT()

    res.status(StatusCodes.OK).json({
        message:"You have Logged-In Successfully",
        Account : Task.toJSON(),
        Token : `${token}`
        
    })
}



module.exports = {
    Register,
    Login
}