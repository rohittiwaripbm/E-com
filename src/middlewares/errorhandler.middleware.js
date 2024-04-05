// export class customErrorHandler extends Error{
//     constructor(statusCode, errMessage)
//     {
//         super(errMessage);
//         this.statusCode=statusCode;
//     }
// }

// export const errorhandlerMiddleware=(err, req, res, next)=>
// {
//     console.log('in errorHandlerMiddleware')
//     if(err instanceof customErrorHandler)
//     {
//         res.status(err.statusCode).send(err.message);
//     }
//     res.status(500).send('Oops... something went wrong');
// }


export class customErrorHandler extends Error {
    constructor(statusCode, errMessage) {
      super(errMessage);
      this.statusCode = statusCode;
    }
  }
  
  export const errorHandlerMiddleware = (err, req, res, next) => {
    // Write your code here
    console.log(err);
    if(err instanceof customErrorHandler)
    {
      res.status(err.statusCode).send(err.message);
    }
    res.status(500).send('oops! something went wrong... Try again later');
  };
  