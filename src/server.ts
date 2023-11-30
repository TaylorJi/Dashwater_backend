// security
import helmet from 'helmet';
import cors from 'cors';

//Server
import express from 'express';
import Environment, {  } from './config/Environments';
import compression from 'compression';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Middleware
// import AuthenticationController from './controllers/authentication/AuthenticationController'; // Make sure uncomment this when AuthenticationController.userAuth works properly

// Cache
import AppCache from './models/cache/AppCache';

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
        origin: "http://localhost:3000",
        credentials: true
    })
);

server.use(cookieParser());

server.listen(port, async () => {

    // Register cache

    console.log('Populating cache with tide data...');

    const tideRegistration = await AppCache.registerTideCache();

    if (!tideRegistration) {
        console.log('There was a problem populating the tide data cache. Check your query limits.');
    } else {
        console.log('Populated tide data cache.');
    }

    console.log('Populating cache with device data...');

    const deviceDataRegistration = await AppCache.registerDeviceCache('12h', '', '');

    if (!deviceDataRegistration) {
        console.log('There was a problem populating the device data cache. Check AWS.');
    } else {
        console.log('Populated device data cache.');
    }

    const historicalDataRegistration = await AppCache.registerHistoricalHighLow();
    if (!historicalDataRegistration) {
        console.log('There was a problem populating the historical data cache. Check AWS.');
    } else {
        console.log('Populated historical data cache.');
    }


    mongoose.set('strictQuery', false);
    mongoose.connect(`${process.env.MONGO_URL}`);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Could not connect to Mongo - restart the server.'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    console.log(`Server started on port ${port}!`);
});


//Routing
import { router as weatherRouter } from './routes/WeatherRoutes';
import { router as sessionRouter } from './routes/SessionRoutes'
import { router as timestreamRouter } from './routes/TimestreamRoutes';
import { router as userRouter } from './routes/UserRoutes';
import { router as trackedDeviceRouter } from './routes/TrackedDeviceRoutes';
import { router as deviceRouter } from './routes/DeviceRoutes';
import { router as calibrationRouter } from './routes/CalibrationRoutes';
import { router as defaultThresholdRouter } from './routes/DefaultThresholdRoutes'
import { router as userThresholdRouter } from './routes/UserThresholdRoutes'



// server.use('/api/ts',  AuthenticationController.userAuth, timestreamRouter);
// server.use('/api/weather', AuthenticationController.userAuth, weatherRouter);
// server.use('/api/session', sessionRouter);
// server.use('/api/user', userRouter);
// server.use('/api/trackedDevice', AuthenticationController.userAuth, trackedDeviceRouter);
// server.use('/api/device', AuthenticationController.userAuth, deviceRouter);
// server.use('/api/calibration', AuthenticationController.userAuth, calibrationRouter);
// server.use('/api/defaultThreshold', AuthenticationController.userAuth, defaultThresholdRouter);
// server.use('/api/userThreshold', AuthenticationController.userAuth, userThresholdRouter);

server.use('/api/ts', timestreamRouter);
server.use('/api/weather', weatherRouter);
server.use('/api/session', sessionRouter);
server.use('/api/user', userRouter);
server.use('/api/trackedDevice', trackedDeviceRouter);
server.use('/api/device', deviceRouter);
server.use('/api/calibration', calibrationRouter);
server.use('/api/defaultThreshold', defaultThresholdRouter);
server.use('/api/userThreshold', userThresholdRouter);