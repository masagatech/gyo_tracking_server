var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var contact = module.exports = {};

contact.saveContactUs = function saveContactUs(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_contactus") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

contact.getContactUs = function getContactUs(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_contactus") + "($1,$2::json);", ['tm', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}