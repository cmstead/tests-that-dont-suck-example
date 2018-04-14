'use strict';

function widgetConnector(signet) {

    function connect(widget) {
        const changeActions = {
            hum: {
                lastValue: 0,
                action: function () { }
            },
            jitter: {
                lastValue: 0,
                action: function () { }
            }
        };

        function onChange(key, action) {
            changeActions[key].action = action;
        }

        function triggerChangeAction(key, newValue) {
            if(newValue !== changeActions[key].lastValue) {
                changeActions[key].action(newValue);
                changeActions[key].lastValue = newValue;
            }
        }

        function triggerChangeEvents() {
            const hum = widget.getHum();
            const jitter = widget.getJitter();

            triggerChangeAction('hum', hum);
            triggerChangeAction('jitter', jitter);
        }

        function setDisplayText(displayText) {
            widget.setDisplayText(displayText);

            triggerChangeEvents();
        }

        function setVoltage(voltage) {
            widget.setVoltage(voltage);

            triggerChangeEvents();
        }

        return {
            onChange: signet.enforce(
                'onChangeKey, action => undefined',
                onChange),
            setDisplayText: signet.enforce(
                'displayText => undefined',
                setDisplayText),
            setVoltage: signet.enforce(
                'voltage => undefined',
                setVoltage)
        };
    }

    return {
        connect: signet.enforce(
            'widget => widgetConnection',
            connect)
    };

}

module.exports = widgetConnector;