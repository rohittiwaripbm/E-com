export const  newErrorHandler=(err, req, res, next)=>{
    console.log('newError')
    console.log(err.message);
    res.status(500).send('this is new error handler Oops! something went wrong');
}