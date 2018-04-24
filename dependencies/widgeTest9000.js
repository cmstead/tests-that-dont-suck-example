'use strict';

function widgeTest9000(
    logger,
    signet,
    testHelper,
    timers
) {

    'use strict';

    function test(widget, widgetTestConfig, continuation) {
        const { widgetConnection, maxVoltage } = testHelper.setup(widget, widgetTestConfig);

        const voltageIncrement = maxVoltage / 20;
        const startingVoltage = 0;

        function updateVoltage(currentVoltage) {
            timers.setTimeout(function () {
                const nextVoltage = currentVoltage + voltageIncrement;

                if (currentVoltage > maxVoltage) {
                    continuation();
                } else {
                    logger.log(`\nSetting voltage to ${currentVoltage}\n---------------------------\n`);

                    widgetConnection.setVoltage(currentVoltage);

                    updateVoltage(nextVoltage);
                }
            }, 75);
        }

        updateVoltage(startingVoltage);
    }

    return {
        test: signet.enforce(
            'widget, widgetTestConfig, continuation => sideEffect',
            test)
    };

}

module.exports = widgeTest9000;