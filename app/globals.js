var global = module.exports = {};

global.globvar = {
    "rootAPI": "/goyoapi"
}

global.schema = function schema(params) {
    return "ginv." + params;
};

global.track = function track(params) {
    return "track." + params;
};

global.constr = function constr() {
    return 'postgres://postgres:123@192.168.1.108:5432/goyo_traveltrack';

    //return 'postgres://postgres:sa@123@traveltrack.goyo.in:5432/goyo_traveltrack';
};