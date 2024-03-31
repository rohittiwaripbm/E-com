import jwt from 'jsonwebtoken';

const jwtAuth = (req,res,next)=>
{
    //1.Read the token
    // const token = req.headers['authorization'];
    const {jwtToken}=req.cookies;

    //2. if no token, return error
    if(!jwtToken)
    {
        return res.status(401).send('unauthorized');
    }

    //3. Check if token is valid
    try {
        const payload = jwt.verify(jwtToken, "EBE5C9AF48B26");
        console.log(payload);
        req.userID = payload.userID;
        req.userEmail = payload.email;
        console.log(req.userID+' - ' + req.userEmail);
    } catch (error) {
        return res.status(401).send('unauthorized');
    }
    next();
}

export default jwtAuth;