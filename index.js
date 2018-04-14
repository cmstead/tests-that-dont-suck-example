'use strict';

const container = require('./container');

const widgeTest9000 = container.build('widgeTest9000');
const widgetFactory = container.build('widgetFactory');

const widget = widgetFactory({
    maxVoltage: 9,
    humPeakVoltage: 10,
    jitterPeakVoltage: 7.3
});

const widgetTestConfig = {
    humTolerance: 0.5,
    jitterTolerance: 0.2,
    displayText: 'hi',
    maxVoltage: 9
};

widgeTest9000.test(widget, widgetTestConfig, () => console.log('\n\nDONE!'));