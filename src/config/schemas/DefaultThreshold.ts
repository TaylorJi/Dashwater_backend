import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DefaultThresholdSchema = new Schema({
    metric: {
        type: String,
        unique: true,
        enum: ["dissolvedOxygen", "electricalConductivity", "liquidLevel", "ph", "temperature", "totalDissolvedSolids",
                "turbidity", "waterFlow", "waterLevel", "waterPressure", "co2Level", "ch4Level"],
        required: true
    },

    defaultMin: {
        type: Number,
        required: true,
    },

    defaultMax: {
        type: Number,
        required: true,
    }

})


const DefaultThreshold =  mongoose.model('DefaultThreshold', DefaultThresholdSchema);

export default DefaultThreshold