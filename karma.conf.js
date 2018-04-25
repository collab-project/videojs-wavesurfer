/**
 * @since 2.3.0
 */

process.env.BABEL_ENV = 'test';

require('babel-register');

var webpackConfig = require('./build-config/webpack.prod.main.js');

var chromeFlags = [
    '--no-sandbox',
    '--use-fake-device-for-media-stream',
    '--use-fake-ui-for-media-stream',
    '--use-file-for-fake-audio-capture=test/support/demo.wav',
    '--autoplay-policy=no-user-gesture-required'
];
var firefoxFlags = {
    'media.navigator.permission.disabled': true,
    'media.navigator.streams.fake': true
};

module.exports = function(config) {
    var configuration = {
        basePath: '',
        frameworks: ['jasmine', 'jasmine-matchers'],
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

            // dependencies
            'node_modules/video.js/dist/video.js',
            'node_modules/wavesurfer.js/dist/wavesurfer.js',
            'node_modules/wavesurfer.js/dist/plugin/wavesurfer.microphone.js',

            // specs
            'test/**/*.spec.js'
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
            'karma-coverage',
            'karma-coveralls',
            'karma-verbose-reporter'
        ],
        browsers: ['Firefox_dev', 'Chrome_dev'],
        captureConsole: true,
        colors: true,
        reporters: ['verbose', 'progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        webpack: webpackConfig,
        customLaunchers: {
            Chrome_dev: {
                base: 'Chrome',
                flags: chromeFlags
            },
            Chrome_ci: {
                base: 'ChromeHeadless',
                flags: chromeFlags
            },
            Firefox_dev: {
                base: 'Firefox',
                prefs: firefoxFlags
            }
        }
    };

    if (process.env.TRAVIS || process.env.APPVEYOR) {
        configuration.browsers = ['Chrome_ci'];
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
