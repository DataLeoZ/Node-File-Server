"use strict";
//加载所需要的模块
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');
 
//创建服务
var httpServer = http.createServer(processRequest);
 
var port = 3000;
 
//指定一个监听的接口
httpServer.listen(port, function() {
    console.log(`app is running at port:${port}`);
    console.log(`url: http://localhost:${port}`);
    cp.exec(`explorer http://localhost:${port}`, function () {
    });
});
 
//响应请求的函数
function processRequest (request, response) {
    //mime类型
    var mime = {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    };
    
    //request里面切出标识符字符串
    var requestUrl = request.url;
    //url模块的parse方法 接受一个字符串，返回一个url对象,切出来路径
    // var pathName = url.parse(requestUrl).pathname;
    // console.log(requestUrl, url.parse(requestUrl), pathName);
    //对路径解码，防止中文乱码
    var pathName = decodeURI(requestUrl);
    if(pathName.charAt(pathName.length - 1) !== '/'){
        pathName += '/';
    }
 
    //解决301重定向问题，如果pathname没以/结尾，并且没有扩展名
    if (!pathName.endsWith('/') && path.extname(pathName) === '') {
        pathName += '/';
        var redirect = "http://" + request.headers.host + pathName;
        response.writeHead(301, {
            location: redirect
        });
        //response.end方法用来回应完成后关闭本次对话，也可以写入HTTP回应的具体内容。
        response.end();
    }
 
    //获取资源文件的绝对路径
    var filePath = path.resolve(__dirname + pathName);
    var ext = path.extname(pathName);
    ext = ext ? ext.slice(1) : 'unknown';
 
    //未知的类型一律用"text/plain"类型
    var contentType = mime[ext] || "text/plain";
 
    fs.stat(filePath, (err, stats) => {

        if (err) {
            console.log(err);
            response.writeHead(404, { "content-type": "text/html" });
            response.end("<h1>404 Not Found</h1>");
        }
        //没出错 并且文件存在
        if (!err && stats.isFile()) {
            readFile(filePath, contentType);
        }
        //如果路径是目录
        if (!err && stats.isDirectory()) {
            var html = 
            "<head><meta charset = 'utf-8'/></head><body>";
            html += `<h1>文件目录:${pathName}</h1>`;
            html += '<div style="display: flex; flex-direction: row; flex-wrap: wrap;">';
            //读取该路径下文件
            fs.readdir(filePath, (err, files) => {
                if (err) {
                    console.log("读取路径失败！");
                } else {
                    var flag = false;
                    for (var file of files) {
                        if (file === "index.html") {
                            readFile(filePath + (filePath[filePath.length-1]=='/' ? '' : '/') + 'index.html', "text/html");
                            flag = true;
                            break;
                        };
                        html += `<span style="flex: 0 0 33.3333%;"><a href='${file}'>${file}</a></span>`;
                    }
                    if(!flag) {
                        html += '</div></body>';
                        response.writeHead(200, { "content-type": "text/html" });
                        response.end(html);
                    }
                }
            });
        }
 
        //读取文件的函数
        function readFile(filePath, contentType){
            response.writeHead(200, { "content-type": contentType });
            //建立流对象，读文件
            var stream = fs.createReadStream(filePath);
            //错误处理
            stream.on('error', function() {
                response.writeHead(500, { "content-type": contentType });
                response.end("<h1>500 Server Error</h1>");
            });
            //读取文件
            stream.pipe(response);
        }
    });
}
