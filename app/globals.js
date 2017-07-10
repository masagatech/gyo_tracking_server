var global = module.exports = {};

global.globvar = {
    "rootAPI": "/goyoapi"
}

global.schema = function schema(params) {
    return "ginv." + params;
};

global.constr = function constr() {
    // return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';

    return 'postgres://postgres:sa@123@13.126.2.220:5432/goyo_track';
};