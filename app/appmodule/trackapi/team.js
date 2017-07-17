var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var team = module.exports = {};

team.saveTeamInfo = function saveTeamInfo(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_teaminfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

team.getTeamDetails = function getTeamDetails(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_teamdetails") + "($1,$2::json);", ['tm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}