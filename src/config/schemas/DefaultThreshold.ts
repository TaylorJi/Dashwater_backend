import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DefaultThresholdSchema = new Schema({
    metric: {
        type: String,
        required: true
    },

    defaultMin: {
        type: Number,
        required: true
    },

    defaultMax: {
        type: Number,
        required: true
    }

})


const DefaultThreshold =  mongoose.model('DefaultThreshold', DefaultThresholdSchema);

export default DefaultThreshold