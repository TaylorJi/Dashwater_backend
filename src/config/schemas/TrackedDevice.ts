import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TrackedDeviceSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        unique: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    deviceId: {
        type: Number,
        required: true
    }

})


const TrackedDevice =  mongoose.model('TrackedDevice', TrackedDeviceSchema);

export default TrackedDevice