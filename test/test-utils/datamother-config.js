'use strict';

const path = require('path');

const dataContainer = require('datamother')();
const basePath = path.join(__dirname, '..', 'motherfiles');

module.exports = require('./datamother-loader').loadFiles(basePath, dataContainer);