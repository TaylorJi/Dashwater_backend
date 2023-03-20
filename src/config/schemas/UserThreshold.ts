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
        ref: 'devices',
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        waterLevel: {
            customMin: {
                type: Number,
                default: 0
            },
            customMax: {
                type: Number,
                default: 1000
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
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
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        }

        // Add water level metric
        // Add boolean to all of them showing if the user wants to get alarmed about that metric or not (isWarning: True/False)
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

UserThreshold.collection.createIndex({ userId: 1, deviceId: 1 }, { unique: true });

export default UserThreshold