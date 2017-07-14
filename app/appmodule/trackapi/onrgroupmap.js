var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var onrgrpmap = module.exports = {};

// Employee Group Mapping

onrgrpmap.saveOwnerGroupMap = function saveOwnerGroupMap(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_onrgroupmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

onrgrpmap.getOwnerGroupMap = function getOwnerGroupMap(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_onrgroupmap") + "($1,$2::json);", ['egm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}