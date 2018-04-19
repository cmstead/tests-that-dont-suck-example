'use strict';

const path = require('path');

var config = {
    cwd: path.join(__dirname, '../../dependencies'),
    sourceDirectories: [
        './',
        'wrapped-modules'
    ]
};

module.exports = require('stubcontractor')(config);