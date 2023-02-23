import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({

    id: {
        type: Number,
        required: true,
        unique: true
    },

    longitude: {
        type: String,
        required: true
    },

    latitude: {
        type: String,
        required: true
    }

});



const Device = mongoose.model('Device', DeviceSchema)

export default Device