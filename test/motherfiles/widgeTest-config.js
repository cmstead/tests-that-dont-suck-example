'use strict';

module.exports = function(dataMother) {
    function widgeTestConfigFactory() {
        return {
            humTolerance: 0.5,
            jitterTolerance: 0.2,
            displayText: 'hi',
            maxVoltage: 9
        };
    }

    dataMother.register('widgeTestConfig', widgeTestConfigFactory);
};