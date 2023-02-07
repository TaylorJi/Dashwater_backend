import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserThresholdSchema = new Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },

    deviceId: {
        type: Number,
        required: true,
        ref: "devices"
    },

    thresholdMetricId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    customMin: {
        type: Number,
        default: null
    },

    customMax: {
        type: Number,
        default: null
    }

})


const UserThreshold =  mongoose.model('UserThreshold', UserThresholdSchema);

export default UserThreshold