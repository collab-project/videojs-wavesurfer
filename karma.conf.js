/* eslint-env node */

process.env.BABEL_ENV = 'test';

require('babel-register');
//var webpackConfig = require('./build-config/webpack.prod.main.js');
var webpackConfig = require('./webpack_config.js');

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
                pattern: 'test/spec/support/demo.wav',
                included: false,
                watched: false,
                served: true
            },

            // specs
            'test/spec/defaults.spec.js',
            'test/spec/utils.spec.js'
        ],
        preprocessors: {
            'test/spec/defaults.spec.js': ['webpack'],
            'test/spec/utils.spec.js': ['webpack'],
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
            'karma-coverage'
        ],
        browsers: ['Chrome'],
        captureConsole: true,
        colors: true,
        reporters: ['progress', 'coverage'],
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
