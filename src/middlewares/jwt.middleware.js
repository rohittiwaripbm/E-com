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
        console.log('come in jwt middleware')
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log(payload);
        req.userID = payload.userID;                            
        req.userEmail = payload.email;
        req.userRole = payload.type;

        console.log(req.userID+' - ' + req.userEmail+ ' userRole - ' + req.userRole);
    } catch (error) {
        return res.status(401).send('unauthorized');
    }
    next();
}

export default jwtAuth;