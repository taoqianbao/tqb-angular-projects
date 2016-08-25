cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.estrip.cordova.alipay/www/alipay.js",
        "id": "com.estrip.cordova.alipay.alipay",
        "merges": [
            "navigator.alipay"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.apprate/www/AppRate.js",
        "id": "com.estrip.cordova.apprate.AppRate",
        "clobbers": [
            "AppRate"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.apprate/www/locales.js",
        "id": "com.estrip.cordova.apprate.locales",
        "runs": true
    },
    {
        "file": "plugins/com.estrip.cordova.camera/www/CameraConstants.js",
        "id": "com.estrip.cordova.camera.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.camera/www/CameraPopoverOptions.js",
        "id": "com.estrip.cordova.camera.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.camera/www/Camera.js",
        "id": "com.estrip.cordova.camera.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.camera/www/CameraPopoverHandle.js",
        "id": "com.estrip.cordova.camera.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.chat/www/chat.js",
        "id": "com.estrip.cordova.chat.chat",
        "merges": [
            "navigator.chat"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.file-transfer/www/FileTransferError.js",
        "id": "com.estrip.cordova.file-transfer.FileTransferError",
        "clobbers": [
            "window.FileTransferError"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.file-transfer/www/FileTransfer.js",
        "id": "com.estrip.cordova.file-transfer.FileTransfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.fullscreen/www/AndroidFullScreen.js",
        "id": "com.estrip.cordova.fullscreen.AndroidFullScreen",
        "clobbers": [
            "AndroidFullScreen"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.imagepicker/www/imagepicker.js",
        "id": "com.estrip.cordova.imagepicker.ImagePicker",
        "clobbers": [
            "plugins.imagePicker"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.media/www/MediaError.js",
        "id": "com.estrip.cordova.media.MediaError",
        "clobbers": [
            "window.MediaError"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.media/www/Media.js",
        "id": "com.estrip.cordova.media.Media",
        "clobbers": [
            "window.Media"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.pushplugin/www/PushNotification.js",
        "id": "com.estrip.cordova.pushplugin.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.sqlite/www/SQLitePlugin.js",
        "id": "com.estrip.cordova.sqlite.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.tmlocation/www/tmlocation.js",
        "id": "com.estrip.cordova.tmlocation.tmlocation",
        "merges": [
            "navigator.tmlocation"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.umeng/www/UmengAnalyticsPlugin.js",
        "id": "com.estrip.cordova.umeng.UmengAnalyticsPlugin",
        "clobbers": [
            "window.plugins.umengAnalyticsPlugin"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.update/www/updateApp.js",
        "id": "com.estrip.cordova.update.updateApp",
        "merges": [
            "navigator.updateApp"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.weixin/www/weixin.js",
        "id": "com.estrip.cordova.weixin.weixin",
        "merges": [
            "navigator.weixin"
        ]
    },
    {
        "file": "plugins/com.estrip.cordova.wxvoice/www/wxvoice.js",
        "id": "com.estrip.cordova.wxvoice.wxvoice",
        "merges": [
            "navigator.wxvoice"
        ]
    },
    {
        "file": "plugins/com.estrip.ionic.keyboard/www/keyboard.js",
        "id": "com.estrip.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/cordova-plugin-appavailability/www/AppAvailability.js",
        "id": "cordova-plugin-appavailability.AppAvailability",
        "clobbers": [
            "appAvailability"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "id": "cordova-plugin-console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "id": "cordova-plugin-console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/cordova-plugin-datepicker/www/android/DatePicker.js",
        "id": "cordova-plugin-datepicker.DatePicker",
        "clobbers": [
            "datePicker"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "id": "cordova-plugin-x-toast.Toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "file": "plugins/cordova-plugin-x-toast/test/tests.js",
        "id": "cordova-plugin-x-toast.tests"
    },
    {
        "file": "plugins/org.devgeeks.Canvas2ImagePlugin/www/Canvas2ImagePlugin.js",
        "id": "org.devgeeks.Canvas2ImagePlugin.Canvas2ImagePlugin",
        "clobbers": [
            "window.canvas2ImagePlugin"
        ]
    },
    {
        "file": "plugins/uk.co.whiteoctober.cordova.appversion/www/AppVersionPlugin.js",
        "id": "uk.co.whiteoctober.cordova.appversion.AppVersionPlugin",
        "clobbers": [
            "cordova.getAppVersion"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
        "id": "cordova-plugin-globalization.GlobalizationError",
        "clobbers": [
            "window.GlobalizationError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-globalization/www/globalization.js",
        "id": "cordova-plugin-globalization.globalization",
        "clobbers": [
            "navigator.globalization"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
        "id": "cordova-plugin-file.DirectoryEntry",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
        "id": "cordova-plugin-file.DirectoryReader",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Entry.js",
        "id": "cordova-plugin-file.Entry",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/File.js",
        "id": "cordova-plugin-file.File",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileEntry.js",
        "id": "cordova-plugin-file.FileEntry",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileError.js",
        "id": "cordova-plugin-file.FileError",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileReader.js",
        "id": "cordova-plugin-file.FileReader",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileSystem.js",
        "id": "cordova-plugin-file.FileSystem",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
        "id": "cordova-plugin-file.FileUploadOptions",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
        "id": "cordova-plugin-file.FileUploadResult",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileWriter.js",
        "id": "cordova-plugin-file.FileWriter",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Flags.js",
        "id": "cordova-plugin-file.Flags",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
        "id": "cordova-plugin-file.LocalFileSystem",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Metadata.js",
        "id": "cordova-plugin-file.Metadata",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
        "id": "cordova-plugin-file.ProgressEvent",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystems.js",
        "id": "cordova-plugin-file.fileSystems"
    },
    {
        "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
        "id": "cordova-plugin-file.requestFileSystem",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
        "id": "cordova-plugin-file.resolveLocalFileSystemURI",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/android/FileSystem.js",
        "id": "cordova-plugin-file.androidFileSystem",
        "merges": [
            "FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
        "id": "cordova-plugin-file.fileSystems-roots",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
        "id": "cordova-plugin-file.fileSystemPaths",
        "merges": [
            "cordova"
        ],
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.estrip.cordova.alipay": "0.1.0",
    "com.estrip.cordova.apprate": "1.1.7",
    "com.estrip.cordova.camera": "1.2.0",
    "com.estrip.cordova.chat": "0.1.0",
    "com.estrip.cordova.file-transfer": "1.2.1",
    "com.estrip.cordova.fullscreen": "1.0.1",
    "com.estrip.cordova.imagepicker": "1.0.6",
    "com.estrip.cordova.ios-security": "0.3.0",
    "com.estrip.cordova.media": "1.0.1",
    "com.estrip.cordova.pushplugin": "2.4.0",
    "com.estrip.cordova.sqlite": "0.7.10-pre",
    "com.estrip.cordova.tmlocation": "1.0.0",
    "com.estrip.cordova.umeng": "0.0.1",
    "com.estrip.cordova.update": "1.0.0",
    "com.estrip.cordova.weixin": "0.8.0",
    "com.estrip.cordova.wxvoice": "0.1.0",
    "com.estrip.ionic.keyboard": "1.0.4",
    "cordova-plugin-appavailability": "0.4.2",
    "cordova-plugin-console": "1.0.1",
    "cordova-plugin-crosswalk-webview": "1.3.1",
    "cordova-plugin-datepicker": "0.8.6",
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-geolocation": "1.0.1",
    "cordova-plugin-network-information": "1.0.1",
    "cordova-plugin-splashscreen": "2.1.0",
    "cordova-plugin-statusbar": "1.0.1",
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-x-toast": "2.2.0",
    "org.devgeeks.Canvas2ImagePlugin": "0.6.0",
    "uk.co.whiteoctober.cordova.appversion": "0.1.7",
    "cordova-plugin-dialogs": "1.1.1",
    "cordova-plugin-globalization": "1.0.1",
    "cordova-plugin-inappbrowser": "1.0.1",
    "cordova-plugin-file": "3.0.0"
}
// BOTTOM OF METADATA
});