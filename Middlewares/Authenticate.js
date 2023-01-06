
const {StatusCodes} = require("http-status-codes")
const jwt = require('jsonwebtoken')


const Authenticate = async (req,res,next) => {
    const AuthHeader = req.headers.authorization

    if(!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
        const error = new Error("You have not Registered in this App")
        error.statusCode = StatusCodes.FORBIDDEN
        next(error)
    }

    const token = AuthHeader.split(" ")[1]

    try {
       const payload =  await jwt.verify(token,process.env.JWT_SECRET)
       if(!payload){
        const error = new Error("Invalid Token Used")
        error.statusCode = StatusCodes.FORBIDDEN
        next(error)
       }

    req.user = {name : payload.name,id: payload.id}
    next()

    } catch (error) {
        next(error)
    }
}

module.exports = Authenticate