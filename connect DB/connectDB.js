const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const connectDB = async(URL) => {
    return await mongoose.connect(URL,{
        useNewUrlParser: true,
        useUnifiedTopology : true
    })
}

module.exports = connectDB