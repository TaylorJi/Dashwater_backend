import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DefaultThresholdSchema = new Schema({
    metric: {
        type: String,
        //
        unique: true,
        enum: ["Dissolved Oxygen", "Electrical Conductivity", "Liquid Level", "PH", "Temperature",
                "Total Dissolved Solids", "Turbidity", "Water Flow", "Water Pressure", "CO2 Level", "CH4 Level"],
        //
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