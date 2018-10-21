var routes = require('express').Router();
var wordRoutes = require('./words');
var phonemeRoutes = require('./phoneme');

routes.use('/phoneme', phonemeRoutes);
routes.use('/words', wordRoutes);

module.exports = routes;