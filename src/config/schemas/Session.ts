import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    userId: {
        type: String,
        // type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    sessionId: {
        type: String,
        required: true,
        unique: true
    },

    sessionExpiry: {
        type: String,
        default: null,
        required: true
    },

    userRole: {
        type: String,
        enum: ['Admin', 'User'],
        required: true
    },
    isValid:{
        type: Boolean
    }

})


const Session =  mongoose.model('Session', SessionSchema);

export default Session
