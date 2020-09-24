#! /usr/bin/env node

const yargs = require('yargs');
const config = require('./config.js');
const package = require('../package.json');
const Server = require('../src/server');

const options = yargs
    .version(package.name + '@' + package.version)
    .usage('file-server [options]')
    .option('port', { alias: 'p', describe: 'Set port', type: 'number', default: config.port })
    .option('host', { alias: 'o', describe: 'Set host', type: 'string', default: config.host })
    .option('showDirectory', { alias: 'd', describe: 'Set is show Directory', type: 'boolean', default: config.showDirectory })
    .example('file-server -port [port] -host [address]', 'file-server -port 8000 -host localhost')
    .help('h').argv;

const server = new Server(options);
server.start();
