import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TrackedDeviceSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    deviceId: {
        type: Number,
        required: true,
        ref: 'devices'
    }

})


const TrackedDevice =  mongoose.model('TrackedDevice', TrackedDeviceSchema);

export default TrackedDevice