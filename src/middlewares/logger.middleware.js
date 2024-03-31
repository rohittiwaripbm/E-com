
import fs from 'fs';

const fsPromise = fs.promises; // fs.promises allows us to create and write data into files asynchronously without using callbacks

async function log(logData){
    try {
        logData = `\n ${new Date().toString()} - ${logData}`;
        await fsPromise.appendFile('log.txt', logData);
    } catch (error) {
        console.log(error);
    }
}

const loggerMiddlware=async (req, res, next)=>{
    if(!req.url.includes('signin'))
    {
        // const logData = `${req.userID} - ${req.userEmail}  -  ${req.url} - ${JSON.stringify(req.body)}`; may be not work
        const logData = ` ${req.url} - ${JSON.stringify(req.body)}`;

        await log(logData);
    }
    next();
}

export default loggerMiddlware;