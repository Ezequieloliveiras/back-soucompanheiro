const JobModel = require('../models/job.model')

async function listJob(req, res) {
    const jobs = await JobModel.find({
        status: true
    })
    res.json(jobs)
}

async function createJob() {

}

async function updateJob() {

}

async function deleteJob() {

}

module.exports = { listJob, createJob, updateJob, deleteJob }
