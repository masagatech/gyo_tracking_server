var rs = require("../appmodule/util/resp.js");
var globals = require("../globals.js");
var fs = require('fs');

var login = require("../appmodule/schoolapi/login.js");
var fileupload = require('../appmodule/schoolapi/fileupload.js');

var workspace = require("../appmodule/schoolapi/workspace.js");
var menu = require("../appmodule/schoolapi/menu.js");
var common = require("../appmodule/schoolapi/common.js");

var dashboard = require("../appmodule/schoolapi/dashboard.js");
var school = require("../appmodule/schoolapi/school.js");
var user = require("../appmodule/schoolapi/user.js");
var vehicle = require("../appmodule/schoolapi/vehicle.js");
var holiday = require("../appmodule/schoolapi/holiday.js");
var location = require("../appmodule/schoolapi/location.js");

var stops = require("../appmodule/schoolapi/stops.js");
var reports = require("../appmodule/schoolapi/reports.js");


var multer = require('multer');

var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'www/uploads/'
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


    //##################################### VIVEK ##############################################################

    //##################################### File Upload ########################################################

    app.post(globals.globvar.rootAPI + "/uploads", fileupload.uploadFile);
    // app.get(globals.globvar.rootAPI + "/getFilePath", fileupload.getFilePath);

    //##################################### File Upload ########################################################

    //##################################### Login ##############################################################

    app.post(globals.globvar.rootAPI + "/getLogin", login.getLogin);
    app.post(globals.globvar.rootAPI + "/getLogout", login.getLogout);
    app.post(globals.globvar.rootAPI + "/savePassword", login.savePassword);

    //##################################### Login ##############################################################

    //##################################### Workspace ##########################################################

    app.post(globals.globvar.rootAPI + "/getWorkspaceDetails", workspace.getWorkspaceDetails);
    app.post(globals.globvar.rootAPI + "/saveWorkspaceInfo", workspace.saveWorkspaceInfo);

    //##################################### Workspace ##############################################################

    //##################################### Menu ###############################################################

    app.post(globals.globvar.rootAPI + "/getMenuDetails", menu.getMenuDetails);
    app.post(globals.globvar.rootAPI + "/getMenuAccess", menu.getMenuAccess);
    app.post(globals.globvar.rootAPI + "/getMenuLog", menu.getMenuLog);

    //##################################### Menu ###############################################################

    //##################################### Common #############################################################

    app.get(globals.globvar.rootAPI + "/getAutoData", common.getAutoData);
    app.post(globals.globvar.rootAPI + "/getDropDownData", common.getDropDownData);

    app.post(globals.globvar.rootAPI + "/getDashboard", common.getDashboard);

    app.post(globals.globvar.rootAPI + "/saveMOM", common.saveMOM);
    app.post(globals.globvar.rootAPI + "/getMOM", common.getMOM);

    //##################################### Common #############################################################

    //##################################### Location ###########################################################

    app.post(globals.globvar.rootAPI + "/saveLocationInfo", location.saveLocationInfo);
    app.post(globals.globvar.rootAPI + "/getLocationDetails", location.getLocationDetails);

    //##################################### Location ###########################################################

    //##################################### Stops ##############################################################

    app.post(globals.globvar.rootAPI + "/saveRoutesInfo", stops.saveRoutesInfo);
    app.post(globals.globvar.rootAPI + "/saveStopsInfo", stops.saveStopsInfo);
    app.post(globals.globvar.rootAPI + "/getStopsDetails", stops.getStopsDetails);

    //##################################### Stops ##############################################################

    //##################################### School #############################################################

    app.post(globals.globvar.rootAPI + "/saveSchoolInfo", school.saveSchoolInfo);
    app.post(globals.globvar.rootAPI + "/getSchoolDetails", school.getSchoolDetails);

    //##################################### School ############################################################

    //##################################### Holiday ############################################################

    app.post(globals.globvar.rootAPI + "/saveHoliday", holiday.saveHoliday);
    app.post(globals.globvar.rootAPI + "/getHoliday", holiday.getHoliday);

    //##################################### Holiday ############################################################

    //##################################### Vehicle ############################################################

    app.post(globals.globvar.rootAPI + "/saveVehicleInfo", vehicle.saveVehicleInfo);
    app.post(globals.globvar.rootAPI + "/getVehicleDetails", vehicle.getVehicleDetails);

    //##################################### Vehicle #############################################################

    //##################################### User ###############################################################

    app.post(globals.globvar.rootAPI + "/saveUserInfo", user.saveUserInfo);
    app.post(globals.globvar.rootAPI + "/updateUserInfo", user.updateUserInfo);
    app.post(globals.globvar.rootAPI + "/getUserDetails", user.getUserDetails);

    app.post(globals.globvar.rootAPI + "/saveUserRights", user.saveUserRights);
    app.post(globals.globvar.rootAPI + "/getUserRights", user.getUserRights);
    app.post(globals.globvar.rootAPI + "/getUserLoginLog", user.getUserLoginLog);

    //##################################### User ###############################################################

    //##################################### Reports #############################################################

    app.post(globals.globvar.rootAPI + "/getRouteWisePassengerReports", reports.getRouteWisePassengerReports);
    app.post(globals.globvar.rootAPI + "/getSpeedVialationReports", reports.getSpeedVialationReports);

    //##################################### Reports #############################################################

    //##################################### VIVEK ###############################################################


    //##################################### PRATIK ##############################################################

    //##################################### Dashboard ###########################################################

    app.post(globals.globvar.rootAPI + "/getDashboard", dashboard.getDashboard);

    //##################################### Dashboard ###########################################################



    //##################################### File Uploads #########################################################

    app.post(globals.globvar.rootAPI + "/uploads", upload.any(), function(req, res) {
        var tmp_path = req.files[0].path;
        var target_path = 'www/uploads/' + req.files[0].originalname;
        var src = fs.createReadStream(tmp_path);
        var dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        fs.unlink(req.files[0].path, function(err) {
            if (err) return console.log(err);
        });

        src.on('end', function() { rs.resp(res, 200, req.body.id); });
        src.on('error', function(err) { res.send({ error: "upload failed" }); });
    });

    //##################################### File Uploads #########################################################

    //##################################### PRATIK ###############################################################
}

module.exports = appRouter;