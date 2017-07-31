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
        if (res) {
            rs.resp(res, 200, data.rows);
        }
    }, function(err) {
        if (res) {
            rs.resp(res, 401, "error : " + err);
        }
    })
}

// api for get trip stops

trip.getTripStops = function getTripStops(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_tripstops") + "($1,$2::json);", ['ts', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// api for get trip stops

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist
}

trip.getTripReports = function getTripReports(req, res, done) {
    // req.body.km = distance(req.body.strlat, req.body.strlng, req.body.endlat, req.body.endlng, "K");
    req.body.km = getDistanceFromLatLonInKm(req.body.strlat, req.body.strlng, req.body.endlat, req.body.endlng);

    db.callProcedure("select " + globals.trackschema("funget_rpt_trips") + "($1,$2::json);", ['ts', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}