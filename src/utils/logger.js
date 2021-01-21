const winston = require("winston");

const { createLogger, format } = require("winston");

const myFormat = format.printf(({ level, message }) => {
    return `${level}: ${message}\t${new Date().toLocaleString()}`;
  });

const logger = createLogger({
    levels: winston.config.syslog.levels,
    format: myFormat,
    defaultMeta: { service: 'user-serviece' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log'}),
    ]
});

if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format: myFormat, level:'debug'
    }))
}
var info = function(sql){
    logger.debug("SQL :: " + sql);
}

module.exports = {logger, info}