/**
 * Update version in file.
 *
 * @file update-version.js
 * @since 2.0.0
 */

var fs = require('fs');
var path = require('path');
var replace = require('replace');
var pjson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var version = pjson.version;

replace({
    regex: "Wavesurfer.VERSION = 'dev';",
    replacement: "Wavesurfer.VERSION = '" + version + "';",
    paths: [path.join('dist', 'videojs.wavesurfer.js')],
    silent: true
});

console.log('OK: Version updated to ' + version);
