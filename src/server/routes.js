var router = require('express').Router();
var four0four = require('./utils/404')();
var _ = require('underscore');
var data = require('./data');
var services = require('./services');

router.post('/attire', services.attire);
router.get('/:temperature', services.temperature);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;
