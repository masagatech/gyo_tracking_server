var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var empgrpmap = module.exports = {};

// Employee Group Mapping

empgrpmap.saveEmpGroupMap = function saveEmpGroupMap(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_empgroupmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

empgrpmap.getEmpGroupMap = function getEmpGroupMap(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_empgroupmap") + "($1,$2::json);", ['egm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}