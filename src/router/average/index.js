const express = require('express');
const router = express.Router();
const { fetchRunningAverage } = require('./handler');

router.get('/running-average', fetchRunningAverage);

module.exports = router;