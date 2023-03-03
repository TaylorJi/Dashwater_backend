import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({

    deviceId: {
        type: Number,
        required: true,
        unique: true
    },

    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],  // [ longitude, latitude ]
            required: true
        }
    }
});

DeviceSchema.index({ location: "2dsphere" });


const Device = mongoose.model('Device', DeviceSchema);

Device.collection.createIndex({ location: "2dsphere" });

export default Device