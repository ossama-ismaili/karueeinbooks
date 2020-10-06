const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Author = new Schema({
    name:{
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    }
});

const Book=new Schema({
    title:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type:Author,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

const Item = new Schema({
    quantity:{
        type: Number,
        required: true
    },
    book:{
        type: Book,
        required: true
    }
});


module.exports = Item;