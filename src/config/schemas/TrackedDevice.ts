import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TrackedDeviceSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true
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
    }

})


const TrackedDevice =  mongoose.model('TrackedDevice', TrackedDeviceSchema);

export default TrackedDevice