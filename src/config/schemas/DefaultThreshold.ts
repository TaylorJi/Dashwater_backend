import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DefaultThresholdSchema = new Schema({
    metric: {
        type: String,
        //
        unique: true,
        // /////////////////////////////// OLD VERSION ///////////////////////////////////////////////
        // enum: ["Dissolved Oxygen", "Electrical Conductivity", "Liquid Level", "PH", "Temperature", "Total Dissolved Solids",
        //         "Turbidity", "Water Flow", "Water Level", "Water Pressure", "CO2 Level", "CH4 Level"],
        // ////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////// NEW VERSION ////////////////////////////////////////////////
        enum: ["dissolvedOxygen", "electricalConductivity", "liquidLevel", "ph", "temperature", "totalDissolvedSolids",
                "turbidity", "waterFlow", "waterLevel", "waterPressure", "co2Level", "ch4Level"],
        ///////////////////////////////////////////////////////////////////////////////////////////////

        //
        required: true
    },

    defaultMin: {
        type: Number,
        required: true,
        //////////////////
        // validate: {
        //     validator: function(value: number) {
        //         console.log("=================================================================");
        //         console.log(value);
        //         console.log("=================================================================");
        //         console.log(this);
        //         console.log("=================================================================");
        //         return value > 5000;
        //     },
        //     message: 'Min cannot exceed'
        // }
    },

    defaultMax: {
        type: Number,
        required: true,

        // validate: {
        //     validator: (value: Number) => {
        //         console.log("==============================")
        //         console.log("HERE")
        //         console.log(this)
        //         console.log(value);
        //         console.log("==============================")
        //         // const minVal = this.getUpdate().$set.defaultMin
        //         // return value > this.get("defaultMin");
        //     },
        //     message: 'value of "maximum" parameter parameter must be greater than value of "minimum" parameter.'
        // }
    }

})


const DefaultThreshold =  mongoose.model('DefaultThreshold', DefaultThresholdSchema);

export default DefaultThreshold