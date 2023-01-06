
const {StatusCodes} = require('http-status-codes')
const JobModel = require('../models/jobs')


const GetAllJobs = async (req,res) => {
    const {id} = req.user.id
    console.log(req.user);
    const Task = await JobModel.find({createdBy : id})
    res.status(StatusCodes.OK).json(Task)
}

const CreateJobs = async (req,res) => {
 req.body.createdBy = req.user.id 
 console.log(req.user);
  console.log(req.body.createdBy);
    const Task = await JobModel.create(req.body)

    res.status(StatusCodes.OK).json(Task)
}

const GetJob = async (req,res) => {
    const {id} = req.user.id
    const {jobId} = req.params
    const Task = await JobModel.findOne({createdBy : id,_id : jobId})
    res.status(StatusCodes.OK).json(Task)
}

const UpdateJob = async (req,res) => {
    const id = req.user.id
    const jobId = req.params
    const {company,position,status} = req.body
if(!company || !position || !status) {
   const err = new Error('Empty Fields Please input all necessary data')
   err.statusCode = StatusCodes.BAD_REQUEST
    next(err)
}
    const Task = await JobModel.findOneAndUpdate({createdBy:id,_id:jobId},req.body,{
        runValidators : true,new : true
    })

    if(!Task) {
        const err = new Error('No Job with that id')
        err.statusCode = StatusCodes.BAD_REQUEST
         next(err) 
    }
    res.status(StatusCodes.OK).json(
        { msg : "Account Updated Successfully",
       Account : Task
    })
}

const DeleteJob = async (req,res) => {
    const id = req.user.id
    const jobId = req.params
    const Task = await JobModel.findOneAndDelete({createdBy : id,_id:jobId})
    res.status(StatusCodes.OK).json({
        message : "Account Deleted Successfully",
        Account : Task
    })
}


module.exports = {
    GetAllJobs,
    CreateJobs,
    GetJob,
    UpdateJob,
    DeleteJob
}