var global = module.exports = {};

global.globvar = {
    "rootAPI": "/goyoapi"
}

global.schema = function schema(params) {
    return "ginv." + params;
};

global.trackschema = function track(params) {
    return "track." + params;
};

//do not use this
global.constr = function constr() {
    return 'postgres://postgres:123@192.168.1.108:5432/goyo_traveltrack';

    //return 'postgres://postgres:sa@123@traveltrack.goyo.in:5432/goyo_traveltrack';
};

global.monconstr = function constr() {
    //return 'postgres://postgres:123@192.168.1.107:5432/goyo_marketing';
    return 'mongodb://127.0.0.1:27017/goyotrack';
};

global.pgdbconnection = {
    user: 'postgres', //env var: PGUSER
    database: 'goyo_traveltrack', //env var: PGDATABASE
    password: '123', //env var: PGPASSWORD
    host: '192.168.1.108', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// global.pgdbconnection = {
//     user: 'postgres', //env var: PGUSER
//     database: 'goyo_traveltrack', //env var: PGDATABASE
//     password: 'sa@123', //env var: PGPASSWORD
//     host: 'traveltrack.goyo.in', // Server hosting the postgres database
//     port: 5432, //env var: PGPORT
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// };