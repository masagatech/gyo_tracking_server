var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var tmempmap = module.exports = {};

// Team Employee Mapping

tmempmap.saveTeamEmployeeMap = function saveTeamEmployeeMap(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_teamempmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

tmempmap.getTeamEmployeeMap = function getTeamEmployeeMap(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_teamempmap") + "($1,$2::json);", ['egm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}