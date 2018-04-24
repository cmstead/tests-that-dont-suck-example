'use strict';

const signet = require('signet')();

signet.defineDuckType('error', {
    message: 'string'
});

signet.alias('nullable', 'variant<null, _>');
signet.alias('nullableError', 'nullable<error>');

signet.alias('optional', 'variant<undefined, _>');
signet.alias('sideEffect', 'undefined');

signet.alias('continuation', 'function<optional<nullableError>, [*] => undefined>');
signet.alias('action', 'function<() => sideEffect>');


signet.alias('humTolerance', 'boundedNumber<0, 1>');
signet.alias('jitterTolerance', 'boundedNumber<0, 1>');

signet.alias('humValue', 'boundedNumber<0, 1>');
signet.alias('jitterValue', 'boundedNumber<0, 1>');

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