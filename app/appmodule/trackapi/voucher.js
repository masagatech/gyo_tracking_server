var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var voucher = module.exports = {};

voucher.saveVoucherInfo = function saveVoucherInfo(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_voucherinfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

voucher.getVoucherDetails = function getVoucherDetails(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_voucherdetails") + "($1,$2::json);", ['vcr', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

voucher.saveVoucherApproval = function saveVoucherApproval(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_voucherapproval") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}