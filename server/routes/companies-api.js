const express = require('express');
const router = express.Router();

const companies = require('./companies');

router.get('/:id', (req, res) => companies.getById(req, res));
router.get('/', (req, res) => companies.getAll(req, res));

module.exports = router;