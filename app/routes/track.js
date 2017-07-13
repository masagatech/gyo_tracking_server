var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var emp = require("../appmodule/trackapi/employee.js");
var empgrpmap = require("../appmodule/trackapi/empgroupmap.js");
var onrgrpmap = require("../appmodule/trackapi/onrgroupmap.js");

var group = require("../appmodule/trackapi/group.js");

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


    //##################################### VIVEK ##############################################################

    //##################################### employee #################################################

    app.post(globals.globvar.rootAPI + "/saveEmployeeInfo", emp.saveEmployeeInfo);
    app.post(globals.globvar.rootAPI + "/getEmployeeDetails", emp.getEmployeeDetails);

    //##################################### employee #################################################

    //##################################### Employee Group Mapping ##############################################

    app.post(globals.globvar.rootAPI + "/saveEmpGroupMap", empgrpmap.saveEmpGroupMap);
    app.post(globals.globvar.rootAPI + "/getEmpGroupMap", empgrpmap.getEmpGroupMap);

    //##################################### Employee Group Mapping ##############################################

    //##################################### Owner Group Mapping #################################################

    app.post(globals.globvar.rootAPI + "/saveOwnerGroupMap", onrgrpmap.saveOwnerGroupMap);
    app.post(globals.globvar.rootAPI + "/getOwnerGroupMap", onrgrpmap.getOwnerGroupMap);

    //##################################### Owner Group Mapping #################################################

    //##################################### VIVEK ###############################################################


    //##################################### Harshala ############################################################

    //##################################### Group ###############################################################

    app.post(globals.globvar.rootAPI + "/saveGroupInfo", group.saveGroupInfo);
    app.post(globals.globvar.rootAPI + "/getGroupDetails", group.getGroupDetails);

    //##################################### Group ###############################################################

    //##################################### Harshala ############################################################
}

module.exports = appRouter;