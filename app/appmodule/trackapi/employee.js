var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var employee = module.exports = {};

employee.saveEmployeeInfo = function saveEmployeeInfo(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_employeeinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

employee.updateEmployeeInfo = function updateEmployeeInfo(req, res, done) {
    db.callFunction("select " + globals.trackschema("funupdate_employeeinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

employee.getEmployeeDetails = function getEmployeeDetails(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_employeedetails") + "($1,$2::json);", ['emp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

employee.getLastStatus = function getLastStatus(req, res, done) {
    db.callFunction("select " + globals.trackschema("funget_api_getuserstate") + "($1::json);", [req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}