# Node File Server
This is a file server based on Node.js. It can help you serve static file, SPA or static site.

> Node.js file system API: https://nodejs.org/api/fs.html

if you want to mapping any local folder in this server content, try:
```
ln -s ~/Documents docs(your folder path)  
```
## Usage
run npm link use stript
```
npm link
```
Then you can use script to run this server
```
file-server [options]

Options:
      --version        Show version number                             [boolean]
  -p, --port           Set port                 [number] [default: 8000]
  -o, --host           Set host            [string] [default: "localhost"]
  -d, --showDirectory  Set is show Directory               [boolean] [default: true]
  -h                   Show help                                       [boolean]

Examples:
  file-server --port 8000 --host localhost
```

## Features
1. [x] File reading ( 20+ Type Support )
1. [x] An interface for listing the directory's contents
1. [x] URL Decode
1. [x] Default Index
1. [x] Security Rule
1. [x] File Stream
1. [x] Catch Error
1. [ ] Cache
1. [ ] 前后端分离（API + 页面）
1. [ ] 服务器端渲染（模块渲染）
1. [ ] 跨域（对外提供 API，jsonp等）
1. [ ] 参数配置（cli）
1. [ ] 本地调试
1. [ ] 访问日志
1. [ ] 代理第三方服务 proxy