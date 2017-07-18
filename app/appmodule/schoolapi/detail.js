var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var detail = module.exports = {};

detail.savedetailInfo = function savedetailInfo(req, res, done) {
    db.callFunction("select " + globals.schema("funsave_detailinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })

}

detail.getdetailDetails = function getdetailDetails(req, res, done) {
    db.callProcedure("select " + globals.schema("funget_detaildetails") + "($1,$2::json);", ['drv', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}