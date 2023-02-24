import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    sessionId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    sessionExpiry: {
        type: String,
        default: null,
        required: true
    }

})


const Session =  mongoose.model('Session', SessionSchema);

export default Session
