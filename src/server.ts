// security
import helmet from 'helmet';
import cors from 'cors';

//Server
import express from 'express';
import Environment from './config/Environments';
import compression from 'compression';

//////////////////////////////////////////
import mongoose from 'mongoose';
//////////////////////////////////////////

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

server.listen(port, () => {
    /////////////////////////////////////////////////////////////////////
    mongoose.connect('mongodb+srv://IoT_dashboard:IMDhYdetq8mkVE1f@iotdashboard.hyyz1ps.mongodb.net/IoT_database');

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    /////////////////////////////////////////////////////////////////////

    console.log(`Server started on port ${port}!`);
});


//Routing
import { router as authRouter } from './routes/AuthenticationRoutes';
import { router as userRouter } from './routes/UserRoutes';

server.use('/api/auth', authRouter);
server.use('/api/user', userRouter);
