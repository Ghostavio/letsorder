cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.core.parseplugin/www/cdv-plugin-parse.js",
        "id": "org.apache.cordova.core.parseplugin.ParsePlugin",
        "clobbers": [
            "window.parsePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.core.parseplugin": "0.1.0"
}
// BOTTOM OF METADATA
});