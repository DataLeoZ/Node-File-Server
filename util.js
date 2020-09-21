/**
 * 根据请求，转换为本地文件。根据安全策略，删除前后 /，移除连续 .
 * @param {*} url
 */
module.exports.getFile = function (url) {
    return decodeURIComponent(url)
        .replace(/^\/|\/$/g, '')
        .replace(/\/+/g, '/')
        .replace(/\.+/g, '.');
};

/**
 * Get File Type | 获取文件类型
 * @param {*} url
 */
module.exports.getFileType = function (url) {
    return url.replace(/.*\./, '').toLowerCase();
};