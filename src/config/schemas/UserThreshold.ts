import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserThresholdSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        unique: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    deviceId: {
        type: Number,
        required: true,
        ref: "Device"
    },

    thresholdMetricId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    customMin: {
        type: Number
    },

    customMax: {
        type: Number
    }

})


const UserThreshold =  mongoose.model('UserThreshold', UserThresholdSchema);

export default UserThreshold