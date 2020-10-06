const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item=require('./Cart')

const User = new Schema({
    fullname:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        required: true
    },
    cart:{
        type: [Item],
        required:true
    }
});

module.exports = mongoose.model('User', User);