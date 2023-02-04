import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

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
        max: 20,
        match: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    },

    role: {
        type: String,
        enum: ['Admin', 'User'],
        required: true
    }

});

const User = mongoose.model('User', UserSchema)

export default User