const express = require('express');
const jobController = require('../controllers/job.controller');
const router = express.Router();

router.get('/job', jobController.listJob)
router.post('/job', jobController.createJob)
router.put('/job', jobController.updateJob)
router.delete('/job', jobController.deleteJob)

module.exports = router