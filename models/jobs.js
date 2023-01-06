

const mongoose = require('mongoose')

const JobsSchema = new mongoose.Schema({
    company : {
        type : String,
        required : [true,"Enter the Company you applied to"],
        maxlength : 50,
        trim : true
    },
    position : {
        type : String,
        required : [true,"Enter The position you applied For to keep Track"],
        trim : true,
        maxlength : [30,"The 'name' of the position is too long"]
    },
    status : {
        type : String,
        enum : ["pending","rejected","accepted"],
        default : "pending"
    },
    createdBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true,
        unique : true
    }
},{timestamps : true})

JobsSchema.set('toJSON',{
    transform : (objects,requiredObject) => {
        // requiredObject.id = requiredObject._id.toString()
        // delete requiredObject._id;
        delete requiredObject.password;
        delete requiredObject.__v;
        delete requiredObject.createdAt;
        delete requiredObject.UpdatedAt;
    }
})



module.exports = mongoose.model("Jobs",JobsSchema)