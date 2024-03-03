import { Schema, model } from 'mongoose';

const User = new Schema({
    username: {
        type: String,
        requried: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
});

export default model('User', User);
