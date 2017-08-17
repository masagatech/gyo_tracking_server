var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var exp = module.exports = {};

exp.saveExpenseInfo = function saveExpenseInfo(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_expenseinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

exp.saveExpenseDetails = function saveExpenseDetails(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_expensedetails") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

exp.getExpenseDetails = function getExpenseDetails(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_expensedetails") + "($1,$2::json);", ['expnm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

exp.getExpenseReports = function getExpenseReports(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_rpt_expensedetails") + "($1,$2::json);", ['exprpt', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}