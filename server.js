'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const config = require('./config');
const { getFile } = require('./util');
const { response302, response404, responseFile, responseDirectory } = require('./response');

// Create Server | 创建服务
const httpServer = http.createServer(processRequest);

// Listen Port | 指定一个监听的接口
httpServer.listen(config.port, function () {
    console.log(`node server is running at port:${config.port}`);
    console.log(`url: http://localhost:${config.port}`);
    cp.exec(`explorer http://localhost:${config.port}`, function () {});
});

//响应请求的函数
function processRequest(request, response) {
    // Covert Url Path to Local File Path | 转换URL路径为本地文件路径
    var requestUrl = getFile(request.url);
    let file = path.resolve(config.baseDir, requestUrl);
    
    // File Not Exist | 文件不存在
    if (!fs.existsSync(file)) {
        // Config has root path | 如果定义了根目录
        if (config.notFound) {
            // Return Root Path | 返回根目录
            response302(response, config.notFound);
        } else {
            response404(response);
        }
        return;
    }

    // File Exist | 本地已经存在的文件
    if (fs.statSync(file).isFile()) {
        responseFile(response, file);
        return;
    }

    // Check Index Files in Config | 查找Config中指定的索引文件是否存在
    // Convert single index file to array type | 如果默认索引文件只有一个，将其转化为数组格式
    if (typeof config.indexFiles === 'string') {
        config.indexFiles = [config.indexFiles];
    }
    const indexPath = config.indexFiles.find((item) => item && fs.existsSync(path.join(file, item)));
    if (indexPath) {
        rFile(response, path.join(file, indexPath));
        return;
    }

    // Check is Show Directory or not | 是否显示目录索引
    if (!config.showDirectory) {
        response404(response);
        return;
    }

    // Show Directory | 遍历本地目录并输出
    responseDirectory(response, requestUrl, file);
}
