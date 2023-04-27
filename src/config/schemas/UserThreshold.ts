import mongoose, { CallbackError } from 'mongoose';

//////////////////////////////////////////////////
import DefaultThreshold from './DefaultThreshold';
import User from './User';
import Device from './Device';

// import { Document } from 'mongoose';
// interface userThresholdInterface extends Document {
//     userId: mongoose.Schema.Types.ObjectId;
//     deviceId: number;
//     metricList: {
//         dissolvedOxygen: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         electricalConductivity: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         liquidLevel: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         ph: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         temperature: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         totalDissolvedSolids: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         turbidity: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         waterFlow: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         waterLevel: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         waterPressure: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         co2Level: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         },
//         ch4Level: {
//             customMin: number | null;
//             customMax: number | null;
//             isWarning: boolean
//         }
//     }
// }
//////////////////////////////////////////////////

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
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        electricalConductivity: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        liquidLevel: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        ph: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        temperature: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        totalDissolvedSolids: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        turbidity: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        waterFlow: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        waterLevel: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        waterPressure: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        co2Level: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        },
        ch4Level: {
            customMin: {
                type: Number,
                // default: 0
                required: false,
                default: null
            },
            customMax: {
                type: Number,
                // default: 1000
                required: false,
                default: null
            },
            isWarning: {
                type: Boolean,
                default: true
            }
        }
    }
})


/////////////////////////////////////////////////////////
UserThresholdSchema.pre('save', async function(this: userThresholdDoc, next) {
    try {

        console.log("==================== PRE MIDDLEWARE-1 ====================");
        console.log(this)

        const user = await User.findOne({ "_id": this.userId });
        if (!user) {
            const error = new Error('User not found');
            return next(error);
        }

        const device = await Device.findOne({ "deviceId": this.deviceId });
        if (!device) {
            const error = new Error('Device not found');
            return next(error);
        }

        const defaultValues = await DefaultThreshold.find({});

        console.log("=========== DEFAULT VALUES ============");
        console.log(defaultValues);
        console.log("================ DEVICE ====================");
        console.log(device.metricList)

        // if (defaultValues.length !== 0) {
        //     for(let i = 0; i < defaultValues.length; i++) {
        //         this.metricList[defaultValues[i].metric].customMin = this.metricList[defaultValues[i].metric].customMin || defaultValues[i].defaultMin;
        //         this.metricList[defaultValues[i].metric].customMax = this.metricList[defaultValues[i].metric].customMax || defaultValues[i].defaultMax;
        //     }
        // }

        //
        const metricListKeys = Object.keys(this.metricList);
        for(let i = 0; i < metricListKeys.length; i++) {
            const defaultMetricIndex = defaultValues.findIndex(metricObj => metricObj.metric === metricListKeys[i]);
            if (device.metricList[metricListKeys[i] as keyof typeof device.metricList].isAvailable && defaultMetricIndex !== -1) {
                this.metricList[defaultValues[defaultMetricIndex].metric].customMin = this.metricList[defaultValues[defaultMetricIndex].metric].customMin || defaultValues[defaultMetricIndex].defaultMin;
                this.metricList[defaultValues[defaultMetricIndex].metric].customMax = this.metricList[defaultValues[defaultMetricIndex].metric].customMax || defaultValues[defaultMetricIndex].defaultMax;
            } else if (!device.metricList[metricListKeys[i] as keyof typeof device.metricList].isAvailable &&
                (this.metricList[metricListKeys[i]].customMin !== null && this.metricList[metricListKeys[i]].customMax !== null)) {
                    this.metricList[metricListKeys[i]].customMin = null as unknown as number;
                    this.metricList[metricListKeys[i]].customMax = null as unknown as number;
                    this.metricList[metricListKeys[i]].isWarning = false;
            }
        }
        //

        console.log("==================== PRE MIDDLEWARE-2 ====================");
        console.log(this)


        next();
    } catch (err) {
        // console.log("==============================");
        // console.log(err);
        next(err as CallbackError);
    }
})
/////////////////////////////////////////////////////////



const UserThreshold =  mongoose.model('UserThreshold', UserThresholdSchema);
// const UserThreshold: mongoose.Model<userThresholdInterface> =  mongoose.model<userThresholdInterface>('UserThreshold', UserThresholdSchema);

UserThreshold.collection.createIndex({ userId: 1, deviceId: 1 }, { unique: true });

export default UserThreshold
