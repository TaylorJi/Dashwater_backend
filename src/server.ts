// security
import helmet from 'helmet';
import cors from 'cors';

//Server
import express from 'express';
import Environment from './config/Environments';
import compression from 'compression';
import mongoose from 'mongoose';

//Load .env (must be loaded ASAP)
import * as dotenv from 'dotenv';
dotenv.config();

// Cache
import AppCache from './models/cache/AppCache';

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

server.listen(port, async () => {

    // Register cache
    await AppCache.registerTideCache();

    mongoose.set('strictQuery', false);
    mongoose.connect(`${process.env.MONGO_URL};
}`);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Could not connect to Mongo - restart the server.'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    console.log(`Server started on port ${port}!`);
});

//Routing
import { router as authRouter } from './routes/AuthenticationRoutes';
import { router as weatherRouter } from './routes/WeatherRoutes';
import { router as sessionRouter } from './routes/SessionRoutes'

server.use('/api/auth', authRouter);


// Testing the timestreamAPI
import { router as apiRouter } from './routes/TimestreamRoutes';
server.use('/api/ts', apiRouter)

server.use('/api/weather', weatherRouter);
server.use('/api/session', sessionRouter);

