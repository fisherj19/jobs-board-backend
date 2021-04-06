const express = require('express');
const router = express.Router();

const user = require('./jobseeker_users');

router.get('/:id', (req, res) => user.getByID(req, res));


router.post('/', (req, res) => user.insert(req, res)); //inserts new jobseeker data into database
router.put('/', (req, res) => user.update(req, res)); //updats jobseeker profile info

module.exports = router;