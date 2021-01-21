const koa = require('koa')
const controller = require("./controllers.js")
const { logger } = require("./utils/logger.js")
const { port } = require("./config.js")
const serve = require('koa-static')
const path = require('path')

const app = new koa()

app.use(controller());
logger.info('static path: ' + path.join(__dirname, "../static/"))
app.use(serve(path.join(__dirname, "../static")));

app.listen(port);

logger.info("current process env: " + process.env.NODE_ENV || "dev")
logger.info("the app is listen on localhost " + port + "...")