const express = require('express');
const router = express.Router();

const companies = require('./companies_users');

router.get('/:id', (req, res) => companies.getById(req, res));
router.get('/', (req, res) => companies.getAll(req, res));
router.post('/', (req, res) => companies.insert(req, res));

module.exports = router;