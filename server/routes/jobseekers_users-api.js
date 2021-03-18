const express = require('express');
const router = express.Router();

const case_workers = require('./jobseekers_users');

router.get('/', (req, res) => users.getAll(req, res));
router.get('/', (req, res) => users.getByID(req, res));
router.post('/', (req, res) => users.insert(req, res));


module.exports = router;