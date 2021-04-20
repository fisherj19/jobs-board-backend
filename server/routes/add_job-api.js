const express = require('express');
const router = express.Router();

const add_job = require('./add_job');

router.get('/', (req, res) => add_job.getAll(req, res));
router.post('/', (req, res) => add_job.insert(req, res));

module.exports = router;