'use strict';

var config = {
    cwd: `${__dirname}/dependencies`,
    modulePaths: [
        './',
        'wrapped-modules'
    ]
};

module.exports = require('stubcontractor')(config);