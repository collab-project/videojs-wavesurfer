/* eslint-disable no-var */
/* eslint-env qunit */
var vw = require('../es5/videojs.wavesurfer.js');
var q = window.QUnit;

q.module('Browserify Require');
q.test('vw should be requirable and bundled via browserify', function(assert) {
  assert.ok(vw, 'videojs.wavesurfer is required properly');
});
