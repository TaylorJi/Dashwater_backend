// security
import helmet from 'helmet';
import cors from 'cors';

//Server
import express from 'express';
import Environment from './config/Environments';
import compression from 'compression';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import queryParser from './helpers/timestreamAPI/functions/queryParser';


// Middleware
//import AuthenticationController from './controllers/authentication/AuthenticationController';
// import TimestreamController from './controllers/timestreamAPI/TimestreamController';
import TimestreamModel from "./models/timestreamAPI/TimestreamModel";
// import { Request } from 'express';


const compareThresholds = async () => {
    console.log('Comparing thresholds...');
    try {
        const sensorData = await retrieveTimestreamData();
        const thresholdData = await UserThresholdModel.getAllThreshold() //retrieveThresholdData();

        console.log('Sensor data:', sensorData);
        console.log('Threshold data:', thresholdData);
        await checkThresholdExceeded(sensorData, thresholdData);
    } catch (error) {
        console.error('Error comparing thresholds:', error);
        throw error;
    }
}

const retrieveTimestreamData = async () => {
    console.log('Retrieving timestream data...');
    try {
        const buoyIdList = '1';
      const response = await TimestreamModel.getBuoyData(buoyIdList);//fetch('http://localhost:8085/api/ts/getAllBuoyIds');
    //   const data = await response.json();
      let data = queryParser.parseQueryResult(response)
    //   console.log(data);
      data.forEach((element) => {
        console.log(element);
        });
      return data;

    } catch (error) {
      console.error('Error retrieving timestream data:', error);
      throw error;
    }
  }

const checkThresholdExceeded = async (sensorData: any[], thresholdData: any[] | null) => {
   thresholdData?.forEach((threshold) => {
        // console.log('Threshold:', threshold);
        sensorData.forEach((sensorReading) => {
            // console.log('Sensor:', sensorReading);
            if (sensorReading.measure_name === threshold.metricId && sensorReading.buoy_id === threshold.deviceId && parseFloat(sensorReading.measure_value__double) < threshold.customMin || parseFloat(sensorReading.measure_value__double) > threshold.customMax ) {
                console.log('Threshold exceeded!');
            }
        })
    })

}

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
        origin: '*',
    })
);

server.use(cookieParser());

server.listen(port, async () => {

    // Register cache

    // console.log('Populating cache with tide data...');

    // const tideRegistration = await AppCache.registerTideCache();

    // if (!tideRegistration) {
    //     console.log('There was a problem populating the tide data cache. Check your query limits.');
    // } else {
    //     console.log('Populated tide data cache.');
    // }

    console.log('Populating cache with device data...');

    const deviceDataRegistration = await AppCache.registerDeviceCache();

    if (!deviceDataRegistration) {
        console.log('There was a problem populating the device data cache. Check AWS.');
    } else {
        console.log('Populated device data cache.');
    }


    mongoose.set('strictQuery', false);
    mongoose.connect(`${process.env.MONGO_URL}`);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Could not connect to Mongo - restart the server.'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
        // userModel.createUser("testUserOne@gmail.com", "Turkey2021!").then((result) => {
        //     if (result != null) {
        //         UserThresholdModel.createUserThreshold(result, 1, 'do').then((finish) =>{
        //             if (finish != null) {
        //                 UserThresholdModel.updateUserThreshold(result, 1, 'do', -5, 79)
        //             }
                    
        //         })

        //         UserThresholdModel.createUserThreshold(result, 1, 'ec').then((finish) =>{
        //             if (finish != null) {
        //                 UserThresholdModel.updateUserThreshold(result, 1, 'ec', 260, 450)
        //             }
                    
        //         })

        //         UserThresholdModel.createUserThreshold(result, 1, 'ph').then((finish) =>{
        //             if (finish != null) {
        //                 UserThresholdModel.updateUserThreshold(result, 1, 'ph', 0, 6)
        //             }
                    
        //         })
                
        //     } else {
        //         console.log("failed")
        //     }
            
        // })
    // UserThresholdModel.updateUserThreshold("645997521a95e72b5724748b", 123, -5, 20)
        // UserThresholdModel.getAllThreshold();
        
        
        
        console.log('hello')
        // retrieveTimestreamData();
        compareThresholds();
    });

    console.log(`Server started on port ${port}!`);
});


//Routing
import { router as authRouter } from './routes/AuthenticationRoutes';
import { router as weatherRouter } from './routes/WeatherRoutes';
import { router as sessionRouter } from './routes/SessionRoutes'
import { router as timestreamRouter } from './routes/TimestreamRoutes';
import { router as userRouter } from './routes/UserRoutes';
import { router as trackedDeviceRouter } from './routes/TrackedDeviceRoutes';
import { router as deviceRouter } from './routes/DeviceRoutes';
import UserThresholdModel from './models/userThreshold/UserThresholdModel';
// import TimestreamController from './controllers/timestreamAPI/TimestreamController';

server.use('/api/auth', authRouter);
server.use('/api/ts', timestreamRouter)
server.use('/api/weather', weatherRouter);
server.use('/api/session', sessionRouter);
server.use('/api/user', userRouter);
server.use('/api/trackedDevice', trackedDeviceRouter);
server.use('/api/device', deviceRouter);
