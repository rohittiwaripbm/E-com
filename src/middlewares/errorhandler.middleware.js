export class customErrorHandler extends Error{
    constructor(statusCode, errMessage)
    {
        super(errMessage);
        this.statusCode=statusCode;
    }
}

export const errorhandlerMiddleware=(err, req, res, next)=>
{
    if(err instanceof customErrorHandler)
    {
        res.status(err.statusCode).send(err.message);
    }
    res.status(500).send('something went wrong');
}