import winston from "winston";

export const logger = winston.createLogger({
    level:'info',
    format : winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports: [new winston.transports.File({filename:'winstonLog.txt'})]
});

const winstonLoggerMiddleware = async(req, res, next)=>{
    if(!req.url.includes('signin'))
    {
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        logger.info(logData);
    }
    next();
}

export default winstonLoggerMiddleware ;
