'use strict';

module.exports = function(dataMother) {
    function widgetConfigFactory() {
        return {
            maxVoltage: 9,
            humPeakVoltage: 10,
            jitterPeakVoltage: 7.3
        };
    }

    dataMother.register('widgetConfig', widgetConfigFactory);
};