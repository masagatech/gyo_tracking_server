var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var rpt = module.exports = {};

rpt.getGroupWiseEmployeeReports = function getGroupWiseEmployeeReports(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_rpt_groupwiseemployee") + "($1,$2::json);", ['grp', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}