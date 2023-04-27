import mongoose from 'mongoose';

/////////////////////////////////
import { Document } from 'mongoose';

interface deviceInterface extends Document {
    deviceId: number;
    location: {
        type: string;
        coordinates: [number];
    };
    metricList: {
        dissolvedOxygen: {
            isAvailable: boolean
        },
        electricalConductivity: {
            isAvailable: boolean
        },
        liquidLevel: {
            isAvailable: boolean
        },
        ph: {
            isAvailable: boolean
        },
        temperature: {
            isAvailable: boolean
        },
        totalDissolvedSolids: {
            isAvailable: boolean
        },
        turbidity: {
            isAvailable: boolean
        },
        waterFlow: {
            isAvailable: boolean
        },
        waterLevel: {
            isAvailable: boolean
        },
        waterPressure: {
            isAvailable: boolean
        },
        co2Level: {
            isAvailable: boolean
        },
        ch4Level: {
            isAvailable: boolean
        }
    }
}
/////////////////////////////////

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
    metricList: {
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


// const Device = mongoose.model('Device', DeviceSchema);
const Device: mongoose.Model<deviceInterface> = mongoose.model<deviceInterface>('Device', DeviceSchema);

Device.collection.createIndex({ location: "2dsphere" });

export default Device