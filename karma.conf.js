/* eslint-env node */

process.env.BABEL_ENV = 'test';

require('babel-register');
var webpackConfig = require('./build-config/webpack.prod.main.js');

module.exports = function(config) {
    var configuration = {
        basePath: '',
        frameworks: ['jasmine', 'jasmine-matchers'],
        hostname: 'localhost',
        port: 9876,
        singleRun: true,
        autoWatch: false,
        files: [
            // demo audio file
            {
                pattern: 'test/support/demo.wav',
                included: false,
                watched: false,
                served: true
            },

            // demo vtt file
            {
                pattern: 'test/support/demo.vtt',
                included: false,
                watched: false,
                served: true
            },

            // style
            'dist/css/videojs.wavesurfer.css',

            // dependencies
            'node_modules/video.js/dist/video.js',
            'node_modules/video.js/dist/video-js.css',
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
            'karma-coverage',
            'karma-verbose-reporter'
        ],
        browsers: ['Chrome'],
        captureConsole: true,
        colors: true,
        reporters: ['verbose', 'progress', 'coverage'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        webpack: webpackConfig,
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};
