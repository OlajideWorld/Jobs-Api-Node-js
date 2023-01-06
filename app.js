
console.log("Express Backend Start-up");

require('dotenv').config()
require("express-async-errors")

// Start Express
const  express = require("express");
const app = express()

// All Middlewares
const Authenticate = require('./Middlewares/Authenticate')
const JobsRoutes = require('./Routes/jobs')
const Routes = require('./Routes/users')
const connectDB = require('./connect DB/connectDB')
const ErrorHandlers = require('./Middlewares/ErrorMiddleware')


// App Routes
app.use(express.json());
app.use("/api/v1/user",Routes);
app.use('/api/v1/jobs',Authenticate,JobsRoutes)


// Errors Handlers
app.use(ErrorHandlers)

const port = process.env.PORT || 5000


const StartUp = async() => {
    try {
        await connectDB(process.env.MONGO_DB)
        console.log('DataBase connected Successfully');
        app.listen(port,() => {
            console.log(` Server is Listening to port: ${port}..... `)
        })  
    } catch (error) {
        console.log(error);
    }
}

StartUp();