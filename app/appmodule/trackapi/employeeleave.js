var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var empleave = module.exports = {};

empleave.saveLeaveEmployee = function saveLeaveEmployee(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_employeeleave") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

empleave.getLeaveEmployee = function getLeaveEmployee(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_employeeleave") + "($1,$2::json);", ['el', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}