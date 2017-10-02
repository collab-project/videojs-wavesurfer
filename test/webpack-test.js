let vw = require('../es5/videojs.wavesurfer.js');
let q = window.QUnit;

q.module('Webpack Require');
q.test('vw should be requirable and bundled via webpack', function(assert) {
  assert.ok(vw, 'videojs.wavesurfer is required properly');
});
