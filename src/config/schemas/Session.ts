import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    sessionId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    session_expiry: {
        type: Date,
        default: Date.now
    }

})


const Session =  mongoose.model('Session', SessionSchema);

export default Session
