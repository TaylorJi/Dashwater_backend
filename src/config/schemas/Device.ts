import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
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