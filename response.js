const fs = require('fs');
const mime = require('./mime');
const { getFileType } = require('./util');
const config = require('./config');

/**
 * 500 Error | 服务器错误
 * @param {*} response
 */
function response500(response) {
    response.writeHead(500, { 'Content-Type': mime.html });
    response.end('<h1>500 Server Error!</h1>');
}

/**
 * 404 Not Found | 资源不存在
 * @param {*} response
 */
module.exports.response404 = function (response) {
    response.writeHead(404, { 'Content-Type': mime.html });
    response.end('<h1>404 Not Found!</h1>');
};

module.exports.response500 = response500;

/**
 * 302 Redirect | 页面重定向
 * @param {*} response
 * @param {*} url
 */
module.exports.response302 = function (response, url) {
    response.statusCode = 302;
    response.setHeader('Location', url);
    response.end();
};

/**
 * 返回文件内容
 * @param {*} response
 * @param {*} file
 */
module.exports.responseFile = function (response, file) {
    // 设置请求的返回头 type
    response.writeHead(200, { 'content-type': mime[getFileType(file)] || config.defaultMime || mime.unknown });
    response.setTimeout(5000);
    // 建立流对象，读文件
    fs.createReadStream(file)
        .on('error', function () {
            response500(response);
        })
        .pipe(response);
};

/**
 * 遍历目录并输出
 * @param {*} res
 * @param {*} url
 * @param {*} file
 */
module.exports.responseDirectory = function (response, url, file) {
    // 请求的目录

    response.setHeader('Content-Type', mime.html);
    const folder = url ? `/${url}/` : '/';
    const title = `Node File Server: ${folder}`;
    let rst = `<!doctype html>
<html>
    <head>
    <meta charset="utf-8"/>
    <title>${title}</title>
</head>
<body>
    <h1>Node File Server</h1>
    <h2>Current Path：<a href="${folder}..">..${folder}</a></h2>
    <div style="display: flex; flex-direction: row; flex-wrap: wrap;">`;
    // Loop Directory | 遍历所有子目录，并输出出来
    rst += fs
        .readdirSync(file, {})
        .map((item) => `<span style="flex: 0 0 33.3333%;"><a href="${folder}${item}">${item}</a></span>`)
        .join('\n');
    rst += '\n</div>';
    response.end(rst);
};
