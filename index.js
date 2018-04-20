'use strict';

// This is a preconfigured Dject container -- this is the heart of the module loading
const container = require('./container');

// Dject will traverse the dependency tree and construct 
// the modules with all of their associated dependencies.
// All dependencies are in the dependencies directory.
const widgeTest9000 = container.build('widgeTest9000');
const widgetFactory = container.build('widgetFactory');

// This configures and creates a widget we can test with WidgeTest9000
const widget = widgetFactory({
    maxVoltage: 9,
    humPeakVoltage: 10,
    jitterPeakVoltage: 7.3
});

// This is the core configuration for a new WidgeTest9000 test run
const widgetTestConfig = {
    humTolerance: 0.5,
    jitterTolerance: 0.2,
    displayText: 'hi',
    maxVoltage: 9
};

// Here we run the tests -- this logic is what we have under test as an example
widgeTest9000.test(widget, widgetTestConfig, () => console.log('\n\nDONE!'));