import './env.js';
import express from 'express';
import swagger from 'swagger-ui-express';
import bodyParser from 'body-parser';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
// import * as ProductRouter from './src/features/product/product.routes.js';
import productRouter from './src/features/product/product.routes.js';
import cookieParser from 'cookie-parser';
import userRouter from './src/features/user/user.routes.js';
import cartRouter from './src/features/cart/cart.routes.js';
import apiDocs from './swagger.json' assert{"type": 'json'};
import loggerMiddlware from './src/middlewares/logger.middleware.js';
import winstonLoggerMiddleware from './src/middlewares/winstonLogger.middleware.js';
import { logger } from './src/middlewares/winstonLogger.middleware.js';
import connectToMongoDB from './src/config/mongodb.js';
import { errorhandlerMiddleware } from './src/middlewares/errorhandler.middleware.js';
let server = express();

// Middleware setup
server.use(cookieParser());
server.use(express.json());
// server.use(jwtAuth,loggerMiddlware); may be not work fine
// server.use(loggerMiddlware);
//winston logger middleware

server.use(winstonLoggerMiddleware);

// Routes setup

//api docs router
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
// Handling all the product routes
server.use('/api/products', jwtAuth, productRouter);

// Handling all the user routes
server.use('/api/users', userRouter);

//Handling all the Cart routes

server.use('/api/cart',jwtAuth, cartRouter);

server.get('/', (req, res) => {
    res.send('e-com api server is running fine');
});

//if no paths are found, have to put this api in the last so that will able to hit all the api if put on top it will not allow to run any other apis so have to put this in the last of all api's;

server.use((req, res)=>{
    res.status(404).send("api not found");
});


server.use(errorhandlerMiddleware);

server.listen(3200, () => {
    console.log('Server is running at http://localhost:3200/');
    connectToMongoDB();
});
