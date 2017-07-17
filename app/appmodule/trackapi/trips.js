var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var trip = module.exports = {};

trip.starttrip = function(req, res, done) {
    req.body.mode = "start";

    db.callFunction("select " + globals.trackschema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

// api for stop trip from driver device

trip.stoptrip = function(req, res, done) {
    req.body.mode = "stop";

    db.callFunction("select " + globals.trackschema("funsave_api_startstoptrip") + "($1::json);", [req.body], function(data) {
        var _d = data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    });
}

// api for save trip stops

trip.saveTripStops = function saveTripStops(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_tripstops") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}