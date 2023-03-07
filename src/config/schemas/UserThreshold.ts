import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserThresholdSchema = new Schema({
    
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    deviceId: {
        type: Number,
        required: true,
        ref: 'devices'
    },

    metricList: {
        dissolvedOxygen: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        electricalConductivity: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        liquidLevel: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        ph: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        temperature: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        totalDissolvedSolids: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        turbidity: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        waterFlow: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        waterPressure: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        co2Level: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        },
        ch4Level: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            }
        }
    }

    // thresholdMetricId: {
    //     type: Schema.Types.ObjectId,
    //     required: true
    // },

    // customMin: {
    //     type: Number,
    //     default: null
    // },

    // customMax: {
    //     type: Number,
    //     default: null
    // }

})


const UserThreshold =  mongoose.model('UserThreshold', UserThresholdSchema);

export default UserThreshold