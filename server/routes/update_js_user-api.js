const express = require('express');
const router = express.Router();

const user = require('./update_js_user');

router.get('/:id', (req, res) => user.getByID(req, res));

router.post('/', (req, res) => user.insert(req, res));

module.exports = router;