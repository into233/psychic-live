
const fs = require('fs')
const path = require('path')
const { logger } = require('./utils/logger')

function add_mapping(router, filepath) {
    // GETs and POSTs
    const mappings = require(filepath)
    const methods = ['GET', 'POST', 'DELETE']
    logger.info("adding mappings")

    for (let url in mappings) {
        for (let method of methods) {
            if (url.startsWith(method)) {
                logger.info("add " + method + " in " + url)
                addurl(router, url, method, mappings)
            }
            break;
        }
    }
}

function addurl(router, url, method, mappings) {
    url_length = method.length + 1;
    return router.get(url.substring(url_length), mappings[url]);
}

function add_controllers(router, controller_dir) {
    const dir = __dirname + controller_dir;
    const files = fs.readdirSync(dir);
    const jsfiles = files.filter(f => f.endsWith(".js"))

    for (let file of jsfiles) {
        add_mapping(router, path.join(dir, file))
    }
}

module.exports = function (dir) {
    const controller_path = dir || '/controllers'

    const router = require('koa-router')()
    add_controllers(router, controller_path)

    return router.routes();
}