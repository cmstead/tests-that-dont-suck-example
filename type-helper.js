'use strict';

const signet = require('signet')();

signet.alias('continuation', 'function');
signet.alias('action', 'function');


signet.alias('humTolerance', 'boundedNumber<0, 1>');
signet.alias('jitterTolerance', 'boundedNumber<0, 1>');

signet.alias('voltage', 'leftBoundedNumber<0>');
signet.alias('maxVoltage', 'leftBoundedInt<0>');

signet.alias('onChangeKey', 'formattedString<(jitter|hum)>');
signet.alias('displayText', 'boundedString<0, 16>');

signet.defineDuckType('widget', {
    setVoltage: 'function',
    getHum: 'function',
    getJitter: 'function'
});

signet.defineDuckType('widgetConnection', {
    setDisplayText: 'function',
    setVoltage: 'function',
    onChange: 'function'
});

signet.defineDuckType('widgetTestConfig', {
    humTolerance: 'boundedNumber<0, 1>',
    jitterTolerance: 'boundedNumber<0, 1>',
    displayText: 'string',
    maxVoltage: 'leftBoundedInt<0>'
});

signet.defineDuckType('widgetTestValues', {
    widgetConnection: 'widgetConnection',
    maxVoltage: 'maxVoltage'
});

signet.defineDuckType('widgetConfig', {
    maxVoltage: 'voltage',
    voltage: '?voltage',
    displayText: '?displayText',
    humPeakVoltage: '?voltage',
    jitterPeakVoltage: '?voltage'
});


module.exports = signet;