import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({

    id: {
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

    // longitude: {
    //     type: String,
    //     required: true
    // },

    // latitude: {
    //     type: String,
    //     required: true
    // }

});

DeviceSchema.index({ location: "2dsphere" });


const Device = mongoose.model('Device', DeviceSchema);

Device.collection.createIndex({ location: "2dsphere" });

export default Device