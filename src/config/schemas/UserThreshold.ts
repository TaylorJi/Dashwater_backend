import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserThresholdSchema = new Schema({
    
    userId: {
        type: String,
        required: true,
        ref: 'users'
    },

    sensorId: {
        type: Number,
        required: true,
    },

    deviceId: {
        type: Number,
        required: true,
    },

    alert: {
        type: Boolean,
        required: true,
    },

    minVal: {
        type: Number,
        requied: true
    },
    
    maxVal: {
        type: Number,
        required: true
    }
});


const UserThreshold =  mongoose.model('UserThreshold', UserThresholdSchema);

UserThreshold.collection.createIndex({ userId: 1, sensorId: 1 }, { unique: true });

export default UserThreshold
