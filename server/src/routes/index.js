var routes = require('express').Router();
var wordRoutes = require('./words');
var phonemeRoutes = require('./phoneme');
var phonicsRoutes = require('./phonics');

routes.use('/phoneme', phonemeRoutes);
routes.use('/words', wordRoutes);
routes.use('/phonics', phonicsRoutes);

module.exports = routes;