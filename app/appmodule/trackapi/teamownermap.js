var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var tmonrmap = module.exports = {};

// Team Ownership Mapping

tmonrmap.saveTeamOwnershipMap = function saveTeamOwnershipMap(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_teamownermap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

tmonrmap.getTeamOwnershipMap = function getTeamOwnershipMap(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_teamownermap") + "($1,$2::json);", ['egm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}