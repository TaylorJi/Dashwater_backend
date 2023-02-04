import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ThresholdSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        unique: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    deviceId: {
        type: Number,
        required: true
    },

    label: {
        type: String,
        required: true
    },

    min: {
        type: Number,
        required: true
    },

    max: {
        type: Number,
        required: true
    }

})


const Threshold =  mongoose.model('Threshold', ThresholdSchema);

export default Threshold