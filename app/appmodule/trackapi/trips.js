var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var trip = module.exports = {};

trip.starttrip = function (req, res, done) {
    req.body.mode = "start";
    db.callFunction("select " + globals.trackschema("funsave_api_startstoptrip") + "($1::json);", [req.body], function (data) {
        var _d = data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);

        // if (_d.resstatus) {
        //     trip.sendNotification({
        //         "tripid": _d.tripid,
        //         "flag": "starttrip",
        //         "type": "driver_tracking",
        //         "subtype": "start_trip"
        //     });

        //     try {
        //         req.body.loc = '[' + req.body.loc + ']'
        //         req.body.tripid = _d.tripid;
        //         req.body.flag = "start";

        //         var _dtr = {
        //             body: req.body
        //         }

        //         tripentry.createtripdetails(_dtr);
        //     } catch (error) {

        //     }
        // }
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    });
}


// api for stop trip from driver device

trip.stoptrip = function (req, res, done) {
    req.body.mode = "stop";

    db.callFunction("select " + globals.trackschema("funsave_api_startstoptrip") + "($1::json);", [req.body], function (data) {
        var _d = data.rows[0].funsave_api_startstoptrip;
        rs.resp(res, 200, _d);

        // if (_d.resstatus) {
        //     var sendData = req.body;
        //     sendData["flag"] = "stoptrip";
        //     sendData["type"] = "driver_tracking";
        //     sendData["subtype"] = "start_trip";

        //     trip.sendNotification(sendData);

        //     try {
        //         tripentry.stop(sendData);
        //     } catch (error) {

        //     }
        // }
    }, function (err) {
        rs.resp(res, 401, "error : " + err);
    });
}
