const express = require('express');
const router = express.Router();

const user = require('./new_js_user');

router.get('/:id', (req, res) => user.getByID(req, res));
router.get('/', (req, res) => user.getAll(req, res));

router.post('/', (req, res) => user.insert(req, res));

module.exports = router;