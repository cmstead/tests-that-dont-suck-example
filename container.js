'use strict';

var config = {
    cwd: `${__dirname}/dependencies`,
    modulePaths: [
        './',
        'wrapped-modules'
    ],
    allowOverride: false,
    eagerLoad: false,
    errorOnModuleDNE: true
};

module.exports = require('dject').new(config);