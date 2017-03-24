cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "org.apache.cordova.camera.Camera",
        "file": "plugins/org.apache.cordova.camera/www/CameraConstants.js",
        "pluginId": "org.apache.cordova.camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "org.apache.cordova.camera.CameraPopoverOptions",
        "file": "plugins/org.apache.cordova.camera/www/CameraPopoverOptions.js",
        "pluginId": "org.apache.cordova.camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "org.apache.cordova.camera.camera",
        "file": "plugins/org.apache.cordova.camera/www/Camera.js",
        "pluginId": "org.apache.cordova.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "org.apache.cordova.camera.CameraPopoverHandle",
        "file": "plugins/org.apache.cordova.camera/www/CameraPopoverHandle.js",
        "pluginId": "org.apache.cordova.camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "org.apache.cordova.dialogs.notification",
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "pluginId": "org.apache.cordova.dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "org.apache.cordova.dialogs.notification_android",
        "file": "plugins/org.apache.cordova.dialogs/www/android/notification.js",
        "pluginId": "org.apache.cordova.dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "org.apache.cordova.network-information.network",
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "pluginId": "org.apache.cordova.network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "org.apache.cordova.network-information.Connection",
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "pluginId": "org.apache.cordova.network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "pluginId": "org.apache.cordova.splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "org.apache.cordova.vibration.notification",
        "file": "plugins/org.apache.cordova.vibration/www/vibration.js",
        "pluginId": "org.apache.cordova.vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.1",
    "org.apache.cordova.camera": "0.3.3",
    "org.apache.cordova.console": "0.2.11",
    "org.apache.cordova.dialogs": "0.2.4",
    "org.apache.cordova.geolocation": "0.3.10",
    "org.apache.cordova.network-information": "0.2.13",
    "org.apache.cordova.splashscreen": "0.3.4",
    "org.apache.cordova.vibration": "0.3.11"
};
// BOTTOM OF METADATA
});