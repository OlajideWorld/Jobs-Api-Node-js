
const {StatusCodes} = require('http-status-codes')

const ErrorHandlers = async(err,req,res,next) => {

let CustomError = {
    message : err.message || "Something went wrong,please try again",
    statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
}

if(typeof err === "string"){
    return res.statusCode(CustomError.statusCode).json(CustomError.message)
}

if(typeof err === "1100") {
    return res.status(CustomError.statusCode).json({
        msg : CustomError.message
    })
}

return res.status(CustomError.statusCode).json(CustomError.message)
}


module.exports = ErrorHandlers