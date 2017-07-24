var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;
var mongo = require("../z_apitrips/tripsinfo.js");

var mobile = module.exports = {};

mobile.livebeats = function (req, res, done) {
    mongo.createtripdetails(req, res, done);
}