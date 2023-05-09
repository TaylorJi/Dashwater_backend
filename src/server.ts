// security
import helmet from 'helmet';
import cors from 'cors';

//Server
import express from 'express';
import Environment from './config/Environments';
import compression from 'compression';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// import userModel from './models/user/UserModel'
// import userThresholdModel from './models/userThreshold/UserThresholdModel'

// Middleware
//import AuthenticationController from './controllers/authentication/AuthenticationController';

// Cache
// import AppCache from './models/cache/AppCache';

//Load .env (must be loaded ASAP)
import * as dotenv from 'dotenv';
dotenv.config();

const port = Environment.port;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(compression());

//Initialize security settings
server.use(helmet());
server.use(
    cors({
        origin: '*',
    })
);

server.use(cookieParser());

server.listen(port, async () => {

    // Register cache
    // const registration = await AppCache.registerTideCache();
    // if (!registration) {
    //     console.log('There was a problem populating the tide data cache. Check your query limits.');
    // } else {
    //     console.log('Populated cache.');
    // }

    mongoose.set('strictQuery', false);
    mongoose.connect(`${process.env.MONGO_URL}`);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Could not connect to Mongo - restart the server.'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    //     userModel.createUser("testOne@gmail.com", "Turkey2021!").then((result) => {
    //         if (result != null) {
    //             UserThresholdModel.createUserThreshold(result, 123).then((finish) =>{
    //                 if (finish != null) {
    //                     UserThresholdModel.updateUserThreshold(result, 123, -5, 20)
    //                 }
                    
    //             })
                
    //         } else {
    //             console.log("failed")
    //         }
            
    // })
    UserThresholdModel.updateUserThreshold("645997521a95e72b5724748b", 123, -5, 20)
        
        
        
        console.log('hello')
    });

    console.log(`Server started on port ${port}!`);
});


//Routing
import { router as authRouter } from './routes/AuthenticationRoutes';
import { router as weatherRouter } from './routes/WeatherRoutes';
import { router as sessionRouter } from './routes/SessionRoutes'
import { router as apiRouter } from './routes/TimestreamRoutes';
import { router as userRouter } from './routes/UserRoutes';
import { router as trackedDeviceRouter } from './routes/TrackedDeviceRoutes';
import { router as deviceRouter } from './routes/DeviceRoutes';
import UserThresholdModel from './models/userThreshold/UserThresholdModel';

server.use('/api/auth', authRouter);
server.use('/api/ts', apiRouter)
server.use('/api/weather', weatherRouter);
server.use('/api/session', sessionRouter);
server.use('/api/user', userRouter);
server.use('/api/trackedDevice', trackedDeviceRouter);
server.use('/api/device', deviceRouter);
