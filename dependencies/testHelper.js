function testHelper(
    alertHelper,
    signet,
    widgetConnector
) {

    'use strict';
    
    function setup(widget, widgetTestConfig) {
        const humTolerance = widgetTestConfig.humTolerance;
        const jitterTolerance = widgetTestConfig.jitterTolerance;
        const maxVoltage = widgetTestConfig.maxVoltage;
        const displayText = widgetTestConfig.displayText;

        const widgetConnection = widgetConnector.connect(widget);

        alertHelper.setHumAlert(widgetConnection, humTolerance);
        alertHelper.setJitterAlert(widgetConnection, jitterTolerance);

        widgetConnection.setDisplayText(displayText);

        return {
            widgetConnection: widgetConnection,
            maxVoltage: maxVoltage
        };
    }

    return {
        setup: signet.enforce(
            'widget, widgetTestConfig => widgetTestValues',
            setup)
    };
}

module.exports = testHelper;