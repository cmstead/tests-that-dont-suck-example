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
            setTimeout: function (action) {
                action();
            }
        };

        childContainer.register(() => loggerFake, 'logger');
        childContainer.register(() => timersFake, 'timers');

        widgeTest9000 = childContainer.build('widgeTest9000');
        widgetFactory = childContainer.build('widgetFactory');
    });

    it('tests a widget with 20 different, increasing voltages', function () {
        const widgetConfig = dataMother.buildData('widgetConfig');
        const widget = widgetFactory(widgetConfig);
        
        const widgeTestConfig = dataMother.buildData('widgeTestConfig');
        const callback = () => { };

        widgeTest9000.test(widget, widgeTestConfig, callback);

        const consoleOutputLines = loggerFake.log.args.map(callArgs => callArgs.join('\n'));
        const consoleOutput = consoleOutputLines.join('\n');

        this.verify(consoleOutput);
    });

});
