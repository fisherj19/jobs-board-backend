const express = require('express');
const router = express.Router();

const case_workers = require('./case_workers');

router.get('/', (req, res) => case_workers.getAll(req, res));
router.post('/', (req, res) => case_workers.insert(req, res));

module.exports = router;