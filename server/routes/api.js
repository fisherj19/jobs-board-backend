const express = require('express');
const router = express.Router();

const auth = require('../auth');

router.get('/profiletype/:id', (req, res) => auth.getProfileType(req, res));
router.get('/', (req, res) => res.status(404).send({ message: 'Invalid API route' }));

module.exports = router;
