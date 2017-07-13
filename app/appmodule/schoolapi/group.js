var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var group = module.exports = {};

group.saveGroupInfo = function saveGroupInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_groupinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

group.getGroupDetails = function getGroupDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_groupdetails") + "($1,$2::json);", ['drv', req.query], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}