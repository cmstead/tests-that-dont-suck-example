'use strict';

function logger() {
    return {
        log: console.log.bind(console)
    };
}

module.exports = logger;