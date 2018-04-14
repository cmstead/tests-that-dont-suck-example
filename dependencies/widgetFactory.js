function widgetFactory(signet) {
    'use strict';

    const maxDisplayTextLength = 16;

    function valueOrDefault(valueType, value, defaultValue) {
        return signet.isTypeOf(valueType)(value) ? value : defaultValue;
    }

    return function (widgetConfig) {
        let maxVoltage = valueOrDefault('voltage', widgetConfig.maxVoltage, 9);
        let midVoltage = maxVoltage / 2;

        let widgetSettings = {
            voltage: valueOrDefault('voltage', widgetConfig.voltage, 0),
            displayText: valueOrDefault('string', widgetConfig.displayText, ''),
            humPeakVoltage: valueOrDefault('voltage', widgetConfig.humPeakVoltage, midVoltage),
            jitterPeakVoltage: valueOrDefault('voltage', widgetConfig.jitterPeakVoltage, midVoltage)
        };

        function setVoltage(voltage) {
            widgetSettings.voltage = voltage;
        }

        function setDisplayText(displayText) {
            widgetSettings.displayText = displayText;
        }

        function getVoltageCoefficient(currentVoltage, peakVoltage) {
            const voltageDifference = Math.abs(currentVoltage - peakVoltage);
            const voltageRatio = (peakVoltage - voltageDifference) / peakVoltage;

            const voltageCoefficient = voltageRatio - Math.floor(voltageRatio);

            return currentVoltage > 0 && voltageCoefficient === 0 ? 0.00001 : voltageCoefficient;
        }

        function getHum() {
            const currentVoltage = widgetSettings.voltage;
            const peakVoltage = widgetSettings.humPeakVoltage;

            return getVoltageCoefficient(currentVoltage, peakVoltage);
        }

        function getJitter() {
            const currentVoltage = widgetSettings.voltage;
            const peakVoltage = widgetSettings.jitterPeakVoltage;
            const voltageCoefficient = getVoltageCoefficient(currentVoltage, peakVoltage);
            const stringLengthRatio = widgetSettings.displayText.length / maxDisplayTextLength;

            return voltageCoefficient * stringLengthRatio;
        }

        return {
            getHum: getHum,
            getJitter: getJitter,

            setDisplayText: signet.enforce(
                'displayText => undefined',
                setDisplayText),
            setVoltage: signet.enforce(
                'voltage => undefined',
                setVoltage)
        };
    };
}

module.exports = widgetFactory;