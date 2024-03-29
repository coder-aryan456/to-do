const { mongoose, Schema } = require('mongoose')

const userschema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        dafault: Date().now
    },
});

module.exports = mongoose.model('user', userschema)