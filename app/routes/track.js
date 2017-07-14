//var tripsinfo = require("../appmodule/z_apitrips/tripsinfo.js");
// var parents = require("../appmodule/schoolapi/parents.js");
// var notify = require("../appmodule/schoolapi/notificationapi.js");

var globals = require("gen").globals;
var rs = require("gen").rs;
var fs = require('fs');
var jwt = require('express-jwt');

var emp = require("../appmodule/trackapi/employee.js");
var empgrpmap = require("../appmodule/trackapi/empgroupmap.js");
var onrgrpmap = require("../appmodule/trackapi/onrgroupmap.js");
var task = require("../appmodule/trackapi/task.js");
var ntf = require("../appmodule/trackapi/notification.js");

var group = require("../appmodule/trackapi/group.js");
var tripapi = require("../appmodule/trackapi/trips.js");



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

    //##################################### VIVEK ##############################################################


    //##################################### Employee #################################################

    app.post(globals.globvar.rootAPI + "/saveEmployeeInfo", emp.saveEmployeeInfo);
    app.post(globals.globvar.rootAPI + "/getEmployeeDetails", emp.getEmployeeDetails);

    //##################################### Employee #################################################

    //##################################### Employee Group Mapping ##############################################

    app.post(globals.globvar.rootAPI + "/saveEmpGroupMap", empgrpmap.saveEmpGroupMap);
    app.post(globals.globvar.rootAPI + "/getEmpGroupMap", empgrpmap.getEmpGroupMap);

    //##################################### Employee Group Mapping ##############################################

    //##################################### Owner Group Mapping #################################################

    app.post(globals.globvar.rootAPI + "/saveOwnerGroupMap", onrgrpmap.saveOwnerGroupMap);
    app.post(globals.globvar.rootAPI + "/getOwnerGroupMap", onrgrpmap.getOwnerGroupMap);

    //##################################### Owner Group Mapping #################################################

    //##################################### Allocate Task #################################################

    app.post(globals.globvar.rootAPI + "/saveAllocateTask", task.saveAllocateTask);
    app.post(globals.globvar.rootAPI + "/getAllocateTask", task.getAllocateTask);

    //##################################### Allocate Task #################################################

    //##################################### Notification #################################################

    app.post(globals.globvar.rootAPI + "/saveNotification", ntf.saveNotification);
    app.post(globals.globvar.rootAPI + "/getNotification", ntf.getNotification);

    //##################################### Notification #################################################


    //##################################### VIVEK ###############################################################


    //##################################### Harshala ############################################################

    //##################################### Group ###############################################################

    app.post(globals.globvar.rootAPI + "/saveGroupInfo", group.saveGroupInfo);
    app.post(globals.globvar.rootAPI + "/getGroupDetails", group.getGroupDetails);

    //##################################### Group ###############################################################

    //##################################### Harshala ############################################################
}

module.exports = appRouter;