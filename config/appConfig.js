const appConfig = {}; //Empty Object

appConfig.port = 8080; //Application Port
appConfig.allowedCorsOrigin = '*'; //Allowed Origins Rule what have to share and what Not
appConfig.env = 'Dev'; //Environment
appConfig.db = {       //Database URL
    uri: 'mongodb://127.0.0.1:27017/AppDB' //Uniform Resource Identifier
}
appConfig.apiVersion = '/api/v1'; //API Version

//Export Object
module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    env: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}//End Export Object