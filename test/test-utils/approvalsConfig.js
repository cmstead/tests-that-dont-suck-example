'use strict';

const approvals = require('approvals');
const approvalsConfFactory = require('approvals-config-factory');

const approvalsDirectory = './test/approvals';
const approvalsConfig = approvalsConfFactory.buildApprovalsConfig({
    reporter: 'kdiff3'
});

module.exports = () => approvals.configure(approvalsConfig).mocha(approvalsDirectory);