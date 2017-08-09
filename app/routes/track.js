var globals = require("gen").globals;
var rs = require("gen").rs;
var fs = require('fs');
var jwt = require('express-jwt');

var emp = require("../appmodule/trackapi/employee.js");
var empleave = require("../appmodule/trackapi/employeeleave.js");
var tem = require("../appmodule/trackapi/teamempmap.js");
var tom = require("../appmodule/trackapi/teamownermap.js");
var task = require("../appmodule/trackapi/task.js");
var ntf = require("../appmodule/trackapi/notification.js");
var expense = require("../appmodule/trackapi/expense.js");
var voucher = require("../appmodule/trackapi/voucher.js");
var reports = require("../appmodule/trackapi/reports.js");

var team = require("../appmodule/trackapi/team.js");
var tag = require("../appmodule/trackapi/tag.js");
var tripapi = require("../appmodule/trackapi/trips.js");
var mobile = require("../appmodule/trackapi/mobile.js");

var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/mobile/'
});

var appRouter = function(app) {
    //##################################### API Details / ######################################################

    var APIInfo = {
        ver: "1.0",
        type: "REST API",
        requestdata: "JSON",
        responsedata: "JSON",
    }

    app.post(globals.globvar.rootAPI + "/", function(req, res, done) {
        console.log(req.body)
        rs.resp(res, 200, APIInfo);
    });

    //##################################### API Details / ######################################################
    app.post(globals.globvar.rootAPI + "/tripapi/start", tripapi.starttrip);
    app.post(globals.globvar.rootAPI + "/tripapi/stop", tripapi.stoptrip);

    app.post(globals.globvar.rootAPI + "/saveTripStops", tripapi.saveTripStops);
    app.post(globals.globvar.rootAPI + "/getTripStops", tripapi.getTripStops);
    app.post(globals.globvar.rootAPI + "/getTripReports", tripapi.getTripReports);

    //##################################### VIVEK ##############################################################


    //##################################### Reports #############################################################

    app.post(globals.globvar.rootAPI + "/getTeamWiseEmployeeReports", reports.getTeamWiseEmployeeReports);

    //##################################### Reports #############################################################

    //##################################### Employee #################################################

    app.post(globals.globvar.rootAPI + "/saveEmployeeInfo", emp.saveEmployeeInfo);
    app.post(globals.globvar.rootAPI + "/updateEmployeeInfo", emp.updateEmployeeInfo);

    app.post(globals.globvar.rootAPI + "/getEmployeeDetails", emp.getEmployeeDetails);
    app.get(globals.globvar.rootAPI + "/getEmpStatus", emp.getLastStatus);

    //##################################### Employee #################################################

    //##################################### Employee Leave #################################################

    app.post(globals.globvar.rootAPI + "/saveLeaveEmployee", empleave.saveLeaveEmployee);
    app.post(globals.globvar.rootAPI + "/getLeaveEmployee", empleave.getLeaveEmployee);

    //##################################### Employee Leave #################################################

    //##################################### Team Employee Mapping ##############################################

    app.post(globals.globvar.rootAPI + "/saveTeamEmployeeMap", tem.saveTeamEmployeeMap);
    app.post(globals.globvar.rootAPI + "/getTeamEmployeeMap", tem.getTeamEmployeeMap);

    //##################################### Team Employee Mapping ##############################################

    //##################################### Team Ownership Mapping #################################################

    app.post(globals.globvar.rootAPI + "/saveTeamOwnershipMap", tom.saveTeamOwnershipMap);
    app.post(globals.globvar.rootAPI + "/getTeamOwnershipMap", tom.getTeamOwnershipMap);

    //##################################### Team Ownership Mapping #################################################

    //##################################### Task Allocate #################################################

    app.post(globals.globvar.rootAPI + "/saveTaskAllocate", task.saveTaskAllocate);
    app.post(globals.globvar.rootAPI + "/getTaskAllocate", task.getTaskAllocate);

    //##################################### Task Allocate #################################################

    //##################################### Task Nature #################################################

    app.post(globals.globvar.rootAPI + "/saveTaskNature", task.saveTaskNature);
    app.post(globals.globvar.rootAPI + "/getTaskNature", task.getTaskNature);

    //##################################### Task Nature #################################################

    //##################################### Notification #################################################

    app.post(globals.globvar.rootAPI + "/saveNotification", ntf.saveNotification);
    app.post(globals.globvar.rootAPI + "/getNotification", ntf.getNotification);

    //##################################### Notification #################################################

    //##################################### Expense #################################################

    app.post(globals.globvar.rootAPI + "/saveExpenseInfo", expense.saveExpenseInfo);
    app.post(globals.globvar.rootAPI + "/saveExpenseDetails", expense.saveExpenseDetails);
    app.post(globals.globvar.rootAPI + "/getExpenseDetails", expense.getExpenseDetails);

    //##################################### Expense #################################################

    //##################################### Voucher #################################################

    app.post(globals.globvar.rootAPI + "/saveVoucherInfo", voucher.saveVoucherInfo);
    app.post(globals.globvar.rootAPI + "/getVoucherDetails", voucher.getVoucherDetails);

    //##################################### Voucher #################################################

    //##################################### File Uploads #########################################################
    // app.post(globals.globvar.rootAPI + "/mobileupload", upload.any(), mobile.uploadFile);

    app.post(globals.globvar.rootAPI + "/mobileupload", upload.any(), function(req, res) {
        var tmp_path = req.files[0].path;
        req.body.uploadimg = req.files[0].originalname;
        var target_path = 'www/mobile/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        tripapi.saveTripStops(req);

        // src.on('end', function() { status: "true" });
        src.on('end', function() { res.send({ status: "true" }); });
        src.on('error', function(err) { res.send({ error: "upload failed" }); });
    });

    //##################################### File Uploads #########################################################

    //##################################### VIVEK ###############################################################


    //##################################### Harshala ############################################################

    //##################################### Team ###############################################################

    app.post(globals.globvar.rootAPI + "/saveTeamInfo", team.saveTeamInfo);
    app.post(globals.globvar.rootAPI + "/getTeamDetails", team.getTeamDetails);

    //##################################### Team ###############################################################

    //##################################### Tag ###############################################################

    app.post(globals.globvar.rootAPI + "/saveTagInfo", tag.saveTagInfo);
    app.post(globals.globvar.rootAPI + "/getTagDetails", tag.getTagDetails);

    app.post(globals.globvar.rootAPI + "/savePushTagInfo", tag.savePushTagInfo);
    app.post(globals.globvar.rootAPI + "/getPushTagDetails", tag.getPushTagDetails);

    //##################################### mobile ###############################################################
    app.post(globals.globvar.rootAPI + "/livebeats", mobile.livebeats);
    //##################################### Harshala ############################################################
}

module.exports = appRouter;