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
        default: null
    },

    customMax: {
        type: Number,
        default: null
    },

    trigger: {
        type: Boolean,
        default: false
    },

    emailSent: {
        type: Boolean,
        default: false
    }



})


const UserThreshold =  mongoose.model('UserThreshold', UserThresholdSchema);

export default UserThreshold