function alertHelper(
    logger,
    signet
) {
    'use strict';

    function setHumAlert(widgetConnection, humTolerance) {
        widgetConnection.onChange('hum', function (humValue) {
            logger.log(`Current hum: ${humValue}`);

            if (humValue > humTolerance) {
                const message = `Hum exceeded acceptable tolerance! Max acceptable hum: ${humTolerance}\n`;

                logger.log(message);
            }
        });
    }

    function setJitterAlert(widgetConnection, jitterTolerance) {
        widgetConnection.onChange('jitter', function (jitterValue) {
            logger.log(`Current display jitter: ${jitterValue}`);

            if (jitterValue > jitterTolerance) {
                const message = `Display jitter exceeded acceptable tolerance! Max acceptable jitter: ${jitterTolerance}\n`;

                logger.log(message);
            }
        });
    }

    return {
        setHumAlert: signet.enforce(
            'widgetConnection, humTolerance => undefined',
            setHumAlert),
        setJitterAlert: signet.enforce(
            'widgetConnection, jitterTolerance => undefined',
            setJitterAlert)
    };
}

module.exports = alertHelper;