const express = require('express');
const router = express.Router();

const user = require('./jobseekers_users');

router.get('/:id', (req, res) => user.getById(req, res));
router.get('/', (req, res) => user.getAll(req, res));

router.post('/', (req, res) => user.insert(req, res));

module.exports = router;