import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserThresholdSchema = new Schema({

    userId: {
        type: String,
        required: true,
        ref: 'users'
    },

    deviceId: {
        type: Number,
        required: true,
        ref: 'devices'
    },

    metricId: {
        type: String,
        required: true
    },

    customMin: {
        type: Number,
        required: true
    },

    customMax: {
        type: Number,
        required: true
    },

    lastTriggerValue: {
        type: Number,
        default: null
    },

    emailTimestamp: {
        type: Number,
        default: 0
    }



})


const UserThreshold =  mongoose.model('UserThreshold', UserThresholdSchema);

export default UserThreshold
