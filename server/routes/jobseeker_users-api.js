const express = require('express');
const router = express.Router();

const user = require('./jobseeker_users');

router.get('/:id', (req, res) => user.getByID(req, res)); //gets the info of a certain jobseeker by their ID.
router.post('/', (req, res) => user.insert(req, res)); //inserts new jobseeker data into database

router.put('/', (req, res) => user.update(req, res)); //updates jobseeker profile info

module.exports = router;