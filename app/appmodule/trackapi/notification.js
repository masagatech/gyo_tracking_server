var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var notification = module.exports = {};

var tripapi = require("../schoolapi/tripapi.js");

notification.saveNotification = function saveNotification(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_notification") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _dtr = {
            "flag": "tracknotify",
            "title": req.body.title,
            "body": req.body.msg,
            "empid": req.body.empid
        }

        tripapi.sendNotification(_dtr);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

notification.getNotification = function getNotification(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_notification") + "($1,$2::json);", ['ntf', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}