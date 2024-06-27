const express = require('express');
const jobController = require('../controllers/job.controller');
const router = express.Router();
const { isAuth } = require('../middlewares/auth');


router.get('/', isAuth, jobController.listJob)

// router.post('/job', jobController.createJob)
// router.put('/job', jobController.updateJob)
// router.delete('/job', jobController.deleteJob)

module.exports = router