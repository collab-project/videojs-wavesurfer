/**
 * @since 2.3.0
 */

process.traceDeprecation = true;
process.env.BABEL_ENV = 'test';

const path = require('path');
require('@babel/register');

var webpackConfig = require('./build-config/webpack.prod.main.js');
var support_dir = path.resolve(__dirname, 'test', 'support');
var fakeAudioStream = path.join(support_dir, 'demo.wav');

// Chrome CLI options
// http://peter.sh/experiments/chromium-command-line-switches/
var chromeFlags = [
    '--no-sandbox',
    '--no-first-run',
    '--noerrdialogs',
    '--no-default-browser-check',
    '--use-fake-device-for-media-stream',
    '--use-fake-ui-for-media-stream',
    '--use-file-for-fake-audio-capture=' + fakeAudioStream,
    '--autoplay-policy=no-user-gesture-required',
    '--user-data-dir=.chrome',
    '--disable-translate',
    '--disable-extensions',
    '--disable-infobars',
    '--ignore-certificate-errors',
    '--allow-insecure-localhost'
];
var firefoxFlags = {
    'media.navigator.permission.disabled': true,
    'media.navigator.streams.fake': true
};
var ci = process.env.TRAVIS || process.env.APPVEYOR;

module.exports = function(config) {
    var configuration = {
        basePath: '',
        frameworks: ['jasmine', 'jasmine-matchers', 'detectBrowsers'],
        hostname: 'localhost',
        port: 9876,
        logLevel: config.LOG_INFO,
        singleRun: true,
        autoWatch: false,
        files: [
            // demo files
            {
                pattern: 'test/support/*',
                included: false,
                watched: false,
                served: true
            },

            // style
            'node_modules/video.js/dist/video-js.css',
            'dist/css/videojs.wavesurfer.css',

            // library dependencies
            'node_modules/video.js/dist/video.js',
            'node_modules/wavesurfer.js/dist/wavesurfer.js',
            'node_modules/wavesurfer.js/dist/plugin/wavesurfer.microphone.js',

            // specs
            {pattern: 'test/**/*.spec.js', watched: false}
        ],
        preprocessors: {
            'test/**/*.spec.js': ['webpack'],

            // source files, that you want to generate coverage for
            // do not include tests or libraries
            'src/js/**/*.js': ['coverage']
        },
        webpackMiddleware: {
            stats: 'errors-only'
        },
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-jasmine-matchers',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            'karma-edge-launcher',
            'karma-coverage',
            'karma-coveralls',
            'karma-verbose-reporter',
            'karma-detect-browsers'
        ],
        detectBrowsers: {
            enabled: true,
            usePhantomJS: false,
            preferHeadless: true,

            postDetection: function(availableBrowsers) {
                if (availableBrowsers.length > 1) {
                    // use custom browser launchers
                    var result = availableBrowsers;
                    let cd = availableBrowsers.indexOf('ChromeHeadless');
                    if (cd > -1) {
                        availableBrowsers[cd] = 'Chrome_headless';
                    }
                    let fd = availableBrowsers.indexOf('FirefoxHeadless');
                    if (fd > -1) {
                        availableBrowsers[fd] = 'Firefox_headless';
                    }
                    let fh = availableBrowsers.indexOf('Firefox');
                    if (fh > -1) {
                        availableBrowsers[fh] = 'Firefox_headless';
                    }
                    let ch = availableBrowsers.indexOf('ChromiumHeadless');
                    if (ch > -1) {
                        availableBrowsers[ch] = 'Chromium_headless';
                    }
                    return result;
                }
            }
        },
        customLaunchers: {
            Chrome_dev: {
                base: 'Chrome',
                flags: chromeFlags
            },
            Chrome_headless: {
                base: 'ChromeHeadless',
                flags: chromeFlags
            },
            Chromium_headless: {
                base: 'ChromiumHeadless',
                flags: chromeFlags
            },
            Firefox_headless: {
                base: 'FirefoxHeadless',
                prefs: firefoxFlags
            }
        },
        captureConsole: true,
        browserNoActivityTimeout: 50000,
        colors: true,
        reporters: ['verbose', 'progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage'
        },
        webpack: webpackConfig
    };

    if (ci) {
        configuration.browsers = ['Chrome_headless'];
        configuration.detectBrowsers.enabled = false;
        configuration.singleRun = true;

        if (process.env.TRAVIS) {
            // enable coveralls
            configuration.reporters.push('coveralls');
            // lcov or lcovonly are required for generating lcov.info files
            configuration.coverageReporter.type = 'lcov';
        }
    }

    config.set(configuration);
};
