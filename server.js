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
import orderRouter from './src/features/order/order.routes.js';
import apiDocs from './swagger.json' assert{"type": 'json'};
import loggerMiddlware from './src/middlewares/logger.middleware.js';
import winstonLoggerMiddleware from './src/middlewares/winstonLogger.middleware.js';
import { logger } from './src/middlewares/winstonLogger.middleware.js';
import connectToMongoDB from './src/config/mongodb.js';
import {customErrorHandler, errorHandlerMiddleware } from './src/middlewares/errorhandler.middleware.js';
import { newErrorHandler } from './src/middlewares/newErrorHandler.middleware.js';
import adminGuard from './src/UserRolesandPermissions/roleGuards.js';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
let server = express();

// Middleware setup
server.use(cookieParser());
server.use(express.json());
// server.use(jwtAuth,loggerMiddlware); may be not work fine
// server.use(loggerMiddlware);
//winston logger middleware

server.use(winstonLoggerMiddleware);


// Routes setup
//connect db here;
server.get('/profile', (req, res)=>{
    res.send('testing profile page')
})

//api docs router
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
// Handling all the product routes
// server.use('/api/products', jwtAuth,adminGuard, productRouter);

server.use('/api/products', jwtAuth, productRouter);


// Handling all the user routes
server.use('/api/users', userRouter);

//Handling all the Cart routes

server.use('/api/cart',jwtAuth, cartRouter);
server.use('/api/orders', jwtAuth, orderRouter);
server.get('/', (req, res) => {
    res.status(200).send('e-com api server is running fine');
});


// server.use(errorHandlerMiddleware);

//if no paths are found, have to put this api in the last so that will able to hit all the api if put on top it will not allow to run any other apis so have to put this in the last of all api's;

server.use((req, res)=>{
    res.status(404).send("api not found");
});

server.use(newErrorHandler)
server.listen(3200, () => {
    console.log('Server is running at http://localhost:3200/');
    // connectToMongoDB();
    connectUsingMongoose();
});
