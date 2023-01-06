
const mongoose = require("mongoose")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true,"Please enter your Name"],
        maxlength: 20
    },
    password : {
        type : String,
        required : [true,"Please enter a Strong password"],
        trim : true,
        minlength : [5,"Please enter of a minimum of 5 Characters"]
    },
    email : {
        type : String,
        required : [true,"Please enter an Email of your choice"],
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please Enter a Valid Email"],
        unique : true
    }
},{timestamps: true})

UserSchema.pre("save",async function() {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
})


UserSchema.set('toJSON',{
    transform : (objects,requiredObjects) => {
        // requiredObjects.id = requiredObjects._id.toString();
        // delete requiredObjects._id
        delete requiredObjects.__v;
        delete requiredObjects.password;
        delete requiredObjects.createdAt;
        delete requiredObjects.updatedAt;
    }
})

UserSchema.methods.IsPassword = async function(password){
    const isMatch = await bcryptjs.compare(password,this.password)
    return isMatch
}

UserSchema.methods.createJWT = async function() {
    return jwt.sign({name : this.name, id : this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_LIFE
    })
}

module.exports = mongoose.model("Users",UserSchema)