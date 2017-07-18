var globals = require("gen").globals;
var rs = require("gen").rs;
var fs = require('fs');
var jwt = require('express-jwt');

var emp = require("../appmodule/trackapi/employee.js");
var tem = require("../appmodule/trackapi/teamempmap.js");
var tom = require("../appmodule/trackapi/teamownermap.js");
var task = require("../appmodule/trackapi/task.js");
var ntf = require("../appmodule/trackapi/notification.js");
var reports = require("../appmodule/trackapi/reports.js");

var team = require("../appmodule/trackapi/team.js");
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

    app.post(globals.globvar.rootAPI + "/saveTripStops", tripapi.saveTripStops);
    app.post(globals.globvar.rootAPI + "/getTripStops", tripapi.getTripStops);

    //##################################### VIVEK ##############################################################


    //##################################### Reports #############################################################

    app.post(globals.globvar.rootAPI + "/getGroupWiseEmployeeReports", reports.getGroupWiseEmployeeReports);

    //##################################### Reports #############################################################

    //##################################### Employee #################################################

    app.post(globals.globvar.rootAPI + "/saveEmployeeInfo", emp.saveEmployeeInfo);
    app.post(globals.globvar.rootAPI + "/getEmployeeDetails", emp.getEmployeeDetails);
    app.get(globals.globvar.rootAPI + "/getEmpStatus", emp.getLastStatus);

    //##################################### Employee #################################################

    //##################################### Team Employee Mapping ##############################################

    app.post(globals.globvar.rootAPI + "/saveTeamEmployeeMap", tem.saveTeamEmployeeMap);
    app.post(globals.globvar.rootAPI + "/getTeamEmployeeMap", tem.getTeamEmployeeMap);

    //##################################### Team Employee Mapping ##############################################

    //##################################### Team Ownership Mapping #################################################

    app.post(globals.globvar.rootAPI + "/saveTeamOwnershipMap", tom.saveTeamOwnershipMap);
    app.post(globals.globvar.rootAPI + "/getTeamOwnershipMap", tom.getTeamOwnershipMap);

    //##################################### Team Ownership Mapping #################################################

    //##################################### Allocate Task #################################################

    app.post(globals.globvar.rootAPI + "/saveAllocateTask", task.saveAllocateTask);
    app.post(globals.globvar.rootAPI + "/getAllocateTask", task.getAllocateTask);
    app.post(globals.globvar.rootAPI + "/saveNatureTask", task.saveNatureTask);

    //##################################### Allocate Task #################################################

    //##################################### Notification #################################################

    app.post(globals.globvar.rootAPI + "/saveNotification", ntf.saveNotification);
    app.post(globals.globvar.rootAPI + "/getNotification", ntf.getNotification);

    //##################################### Notification #################################################

    //##################################### VIVEK ###############################################################


    //##################################### Harshala ############################################################

    //##################################### Team ###############################################################

    app.post(globals.globvar.rootAPI + "/saveTeamInfo", team.saveTeamInfo);
    app.post(globals.globvar.rootAPI + "/getTeamDetails", team.getTeamDetails);

    //##################################### Team ###############################################################

    //##################################### Harshala ############################################################
}

module.exports = appRouter;