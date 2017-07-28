var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var rpt = module.exports = {};

rpt.getTeamWiseEmployeeReports = function getTeamWiseEmployeeReports(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_rpt_teamwiseemployee") + "($1,$2::json);", ['tm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}