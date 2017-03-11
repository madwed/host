var getbabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../src/schema/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
