import { Schema, model } from 'mongoose';

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    emailConfirmed: {
        type: Boolean,
        default: false,
    },

    updateToken: {
        type: String,
        required: true,
    },

    refreshToken: {
        type: String,
        required: false,
    },
});

export default model('User', User);
