'use strict';

const fs = require('fs');
const path = require('path');

function isFile(basePath, fileName) {
    const filePath = path.join(basePath, fileName);

    try {
        return fs.lstatSync(filePath).isFile();
    } catch (e) {
        return false;
    }
}

function isDirectory(basePath, fileName) {
    const filePath = path.join(basePath, fileName);

    try {
        return fs.lstatSync(filePath).isDirectory();
    } catch (e) {
        return false;
    }
}

function loadModule(basePath, fileName) {
    const filePath = path.join(basePath, fileName);
    return require(filePath);
}

function loadFilesFromPaths(filePaths, dataContainer, onDirectoryAction) {
    filePaths.forEach(function (filePath) {
        const dataModule = isFile(filePath) ? loadModule(filePath) : null;

        if (typeof dataModule === 'function') {
            dataModule(dataContainer);
        } else if (isDirectory(filePath)) {
            onDirectoryAction(filePath, dataContainer);
        }
    });

    return dataContainer;
}



function getFilePaths(basePath) {
    const dotNamesPattern = /^\.+$/;

    return fs.readdirSync(basePath)
        .filter(fileName => fileName.match(dotNamesPattern) === null)
        .map(fileName => path.join(basePath, fileName));
}

function loadFiles(basePath, dataContainer) {
    const filePaths = getFilePaths(basePath);

    return loadFilesFromPaths(filePaths, dataContainer, () => {});
}

function loadFilesRecursive(basePath, dataContainer) {
    const filePaths = getFilePaths(basePath);

    return loadFilesFromPaths(filePaths, dataContainer, loadFilesRecursive);
}

module.exports = {
    loadFiles: loadFiles,
    loadFilesRecursive: loadFilesRecursive
};