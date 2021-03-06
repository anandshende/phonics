var routes = require('express').Router({mergeParams: true});
var wordRoutes = require('./words');
var phonemeRoutes = require('./phoneme');
var phonicsRoutes = require('./phonics');
var v2 = require('../v2/routes');

routes.use('/v2/:level', v2);
routes.use('/phoneme', phonemeRoutes);
routes.use('/words', wordRoutes);
routes.use('/phonics', phonicsRoutes);

module.exports = routes;