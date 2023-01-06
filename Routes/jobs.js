
const express = require('express')
const route = express.Router()

const {
    GetAllJobs,
    CreateJobs,
    GetJob,
    UpdateJob,
    DeleteJob
} = require("../controllers/jobs")

route.route('/').post(CreateJobs).get(GetAllJobs)
route.route('/:id').get(GetJob).patch(UpdateJob).delete(DeleteJob)

module.exports = route