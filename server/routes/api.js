const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.status(404).send({ message: 'Invalid API route' }));

module.exports = router;
