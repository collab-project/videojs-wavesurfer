videojs-wavesurfer changelog
============================

1.2.2 (unreleased)
------------------

- Bugfix: add compatibility for video.js 5.11.0 and newer (#20)


1.2.1 - 2016/05/22
------------------

- Documentation updates


1.2.0 - 2016/03/25
------------------

- Prevent negative or invalid values in `formatTime`
- Documentation updates


1.1.0 - 2016/02/26
------------------

- Catch microphone device errors
- Bump required wavesurfer.js version to 1.0.57 for microphone plugin fixes
- Bugfix: make sure video.js starts playback mode
- Bugfix: pass wavesurfer config to microphone plugin


1.0.6 - 2016/01/17
------------------

- Fix issues with Firefox for Android (#15)


1.0.5 - 2016/01/17
------------------

- Propagate wavesurfer errors properly (#13 by @xlc)


1.0.4 - 2015/12/21
------------------

- Fixed wrong video.js module require for browserify


1.0.3 - 2015/10/15
------------------

- Fix missing amd/node/global browser dependency for wavesurfer


1.0.2 - 2015/10/15
------------------

- Make sure controlBar is always showing (if `controls: true`)
- Fix module Node/AMD/browser globals


1.0.1 - 2015/10/14
------------------

 - Bugfix: use flex for controlBar so other plugins, like videojs-record, can add more controls to it.


1.0.0 - 2015/10/12
------------------

- Support for video.js 5
- Dropped support for video.js 4.x


0.9.9 - 2015/10/06
------------------

- Use new `microphone.pause` and `microphone.play` during `live` mode
- Bump minimum version for wavesurfer.js to 1.0.44 (for microphone plugin updates)


0.9.8 - 2015/10/04
------------------

- Update bower and npm so only video.js v4.x releases are fetched, v5.0 is not supported yet (#5).
- Ability to override waveform height (#9)


0.9.7 - 2015/08/27
------------------

- Allow custom wavesurfer container (#7)


0.9.6 - 2015/03/19
------------------

- Also remove the microphone plugin (if enabled) in `destroy`


0.9.5 - 2015/03/03
------------------

- Compatibility fix for video.js 4.12


0.9.4 - 2015/02/18
------------------

- Compatibility with video.js 4.12.0


0.9.3 - 2015/02/18
------------------

- Documented video support and added an example (#3)


0.9.2 - 2015/02/12
------------------

- Update metadata for video


0.9.1 - 2015/01/14
------------------

- Documentation and packaging fixes.


0.9.0 - 2015/01/06
------------------

- Bugfixes


0.8.1 - 2014/12/17
------------------

- Fix bug with loading `Blob` or `File` objects


0.8.0 - 2014/12/17
------------------

- Add microphone support for live audio visualization


0.7.0 - 2014/12/08
------------------

- Ignore fullscreen mode when no valid src was loaded
- Hide loading spinner when no valid src is found
- Fix issue with currentTimeDisplay's internal timer


0.6.0 - 2014/11/25
------------------

- Bugfixes


0.5.0 - 2014/11/25
------------------

- Bugfixes


0.4.0 - 2014/11/19
------------------

- Add `msDisplayMax` plugin setting
- Minor bugfixes, more docs


0.3.0 - 2014/11/14
------------------

- Add fullscreen feature
- Fix issue with auto-play (#2)
- Make package available on bower and npm


0.2.0 - 2014/10/05
------------------

- Compatibility with videojs 4.6 - 4.9


0.1.0 - 2014/03/18
------------------

- Initial release
