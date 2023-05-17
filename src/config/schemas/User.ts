import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },

    password: {
        type: String,
        required: true,
        min: 8,
        max: 50
    },

    role: {
        type: String,
        enum: ['Admin', 'User'],
        required: true
    }

});

const User = mongoose.model('User', UserSchema)

export default User