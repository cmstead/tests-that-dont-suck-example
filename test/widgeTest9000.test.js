'use strict';

const container = require('../container');
const dataMother = require('./test-utils/datamother-config');
const stubcontractor = require('../stubcontractorConfig');

const sinon = require('sinon');

require('./test-utils/approvalsConfig')();

describe('WidgeTest9000', function () {

    let widgetFactory;
    let widgeTest9000;
    let loggerFake;

    beforeEach(function () {
        const childContainer = container.new();

        loggerFake = {
            log: sinon.spy()
        };

        const timersFake = {
            setTimeout: function(action) {
                action();
            }
        };

        childContainer.register(() => loggerFake, 'logger');
        childContainer.register(() => timersFake, 'timers');

        widgeTest9000 = childContainer.build('widgeTest9000');
        widgetFactory = childContainer.build('widgetFactory');
    });

    it('tests a widget with 20 different, increasing voltages', function() {
        const widget = widgetFactory({
            maxVoltage: 9,
            humPeakVoltage: 10,
            jitterPeakVoltage: 7.3
        });

        widgeTest9000.test(
            widget,
            {
                humTolerance: 0.5,
                jitterTolerance: 0.2,
                displayText: 'hi',
                maxVoltage: 9
            },
            () => {}
        );

        const consoleOutputLines = loggerFake.log.args.map(callArgs => callArgs.join('\n'));
        const consoleOutput = consoleOutputLines.join('\n');

        this.verify(consoleOutput);
    });

});
