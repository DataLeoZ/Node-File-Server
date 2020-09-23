# Node File Server
This is a file server based on Node.js. It can help you serve static file, SPA or static site.

> Node.js file system API: https://nodejs.org/api/fs.html

if you want to mapping any local folder in this server content, try:
```
ln -s ~/Documents docs(your folder path)  
```

## Features
1. [x] File reading ( 20+ Type Support ) | 文件内容查看 
1. [x] An interface for listing the directory's contents | 目录浏览
1. [x] URL Decode | 中文URL解码
1. [x] Default Index | 默认索引（可配置）
1. [x] 安全策略（磁盘文件权限、网页访问权限）
1. [x] File Stream | 文件流读取
1. [x] Catch Error | 异常处理
1. [ ] 缓存（文件修改日期等）
1. [ ] 前后端分离（API + 页面）
1. [ ] 服务器端渲染（模块渲染）
1. [ ] 跨域（对外提供 API，jsonp等）
1. [ ] 参数配置（cli）
1. [ ] 本地调试
1. [ ] 访问日志
1. [ ] 代理第三方服务 proxy