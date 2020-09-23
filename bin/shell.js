#! /usr/bin/env node

const yargs = require('yargs');
const config = require('./config.js');
const pkg = require('../package.json');
const StaticServer = require('../src/staticServer');

const options = yargs
    .version(pkg.name + '@' + pkg.version)
    .usage('file-server [options]')
    .option('p', { alias: 'baseDir', describe: '设置服务器端口号', type: 'number', default: config.port })
    .option('o', { alias: 'openbrowser', describe: '是否打开浏览器', type: 'boolean', default: config.openbrowser })
    .option('n', { alias: 'host', describe: '设置主机名', type: 'string', default: config.host })
    .option('v', { alias: 'version', type: 'string' })
    .example('file-server -p [port] -o [address]', 'file-server -p 8000 -o localhost 在根目录开启监听8000端口的静态服务器')
    .help('h').argv;

const server = new StaticServer(options);
server.start();
