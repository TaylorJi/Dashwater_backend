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
    },

    metricList: {           // Modification Starts Here //
        dissolvedOxygen: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        electricalConductivity: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        liquidLevel: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        ph: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        temperature: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        totalDissolvedSolids: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        turbidity: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        waterFlow: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        waterLevel: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        waterPressure: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        co2Level: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        },
        ch4Level: {
            isAvailable: {
                type: Boolean,
                required: true
            }
        }
    }
});

DeviceSchema.index({ location: "2dsphere" });


const Device = mongoose.model('Device', DeviceSchema);

Device.collection.createIndex({ location: "2dsphere" });

export default Device