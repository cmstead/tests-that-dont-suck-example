'use strict';

const container = require('../container');
const dataMother = require('./test-utils/datamother-config');
const stubcontractor = require('./test-utils/stubcontractorConfig');

const sinon = require('sinon');

require('./test-utils/approvalsConfig')();

describe('WidgeTest9000', function () {

    let widgetConnectionFake;
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

        widgetConnectionFake = stubcontractor.getApiEndpoints(
            'widgetConnector',
            ['setVoltage']
        );

        widgetConnectionFake.setVoltage.onCall(sinon.spy());

        const testHelperFake = stubcontractor.getApiEndpoints(
            'testHelper',
            ['setup']
        );

        testHelperFake.setup.onCall(function() {
            return {
                widgetConnection: widgetConnectionFake,
                maxVoltage: 9
            };
        });

        childContainer.register(() => loggerFake, 'logger');
        childContainer.register(() => timersFake, 'timers');
        childContainer.register(() => testHelperFake, 'testHelper');

        widgeTest9000 = childContainer.build('widgeTest9000');
        widgetFactory = childContainer.build('widgetFactory');
    });

    it('tests a widget with 20 different, increasing voltages', function () {
        const widgetConfig = dataMother.buildData('widgetConfig');
        const widget = widgetFactory(widgetConfig);
        
        const widgeTestConfig = dataMother.buildData('widgeTestConfig');
        const callback = () => { };

        widgeTest9000.test(widget, widgeTestConfig, callback);

        const setVoltageSpy = widgetConnectionFake.setVoltage.getOnCallAction();

        const callResults = {
            callCount: setVoltageSpy.callCount,
            args: setVoltageSpy.args.map(argSet => argSet.toString())
        };

        this.verify(JSON.stringify(callResults, null, 4));
    });

    it('logs each time the voltage is set', function () {
        const widgetConfig = dataMother.buildData('widgetConfig');
        const widget = widgetFactory(widgetConfig);
        
        const widgeTestConfig = dataMother.buildData('widgeTestConfig');
        const callback = () => { };

        widgeTest9000.test(widget, widgeTestConfig, callback);

        const callResults = loggerFake.log.args.map(argSet => argSet.toString());

        this.verify(JSON.stringify(callResults, null, 4));
    });

});
