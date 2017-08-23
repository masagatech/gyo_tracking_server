var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var empleave = module.exports = {};
var tripapi = require("../schoolapi/tripapi.js");
var notification = require("../trackapi/notification.js");

empleave.saveEmployeeLeave = function saveEmployeeLeave(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_employeeleave") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

empleave.getEmployeeLeave = function getEmployeeLeave(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_employeeleave") + "($1,$2::json);", ['el', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

empleave.saveEmployeeLeaveApproval = function saveEmployeeLeaveApproval(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_empleaveapproval") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);

        var _dtr = {
            "flag": "tracknotify",
            "title": data.rows[0].funsave_empleaveapproval.title,
            "body": data.rows[0].funsave_empleaveapproval.msg,
            "empid": data.rows[0].funsave_empleaveapproval.ntfempid
        }

        console.log(_dtr);

        tripapi.sendNotification(_dtr);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

empleave.getEmployeeLeaveReports = function getEmployeeLeaveReports(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_rpt_empleavedetails") + "($1,$2::json);", ['el', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}