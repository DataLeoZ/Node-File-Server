/**
 * config
 */
module.exports = {
    host: 'localhost',
    baseDir: process.env.baseDir || './', // 静态资源目录
    defaultMime: 'application/octet-stream', // 默认类型，文件下载的数据流
    port: 8000,
    indexFiles: ['index.htm', 'index.html', 'index.php'], // 默认目录下的首页
    showDirectory: true, // 是否显示目录索引
    notFound: '/', // 出错时，返回首页。或者 404 提示
};
