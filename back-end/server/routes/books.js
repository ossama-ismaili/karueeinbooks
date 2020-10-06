var express = require('express');
var booksRouter = express.Router();
var Book=require('../models/Book');

booksRouter.route('/')
.get((req, res, next)=>{
    Book.find()
    .then(books=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(books);
    },err=>next(err))
    .catch(err=>next(err));
})
.post((req, res, next)=>{
    let book = new Book(req.body);
    book.save()
    .then(book => {
        console.log('Book Created: ',book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    },err=>next(err))
    .catch(err => next(err));
});


booksRouter.route('/:id')
.get((req, res, next)=>{
    let id = req.params.id;
    Book.findById(id)
    .then(book=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    },err=>next(err))
    .catch(err=>next(err));
})
.put((req, res, next)=>{
    Book.findById(req.params.id) .
    then(book=>{
        book.book_title = req.body.book_title;
        book.book_image = req.body.book_image;
        book.book_author = req.body.book_author;   
        book.book_release_date = req.body.book_release_date;
        book.book_language = req.body.book_language;
        book.book_created_at = req.body.book_created_at;
        book.book_price = req.body.book_price;    
        book.save()
        .then(book => {
            console.log('Book Updated: ',book);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(book);
        });
    },err=>next(err))
    .catch(err=>next(err));
})
.delete((req, res, next)=>{
    Book.findByIdAndRemove(req.params.id, req.body)
    .then(book=>{
        console.log("Book Deleted: ",book);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(book);
    },err=>next(err))
    .catch(err=>next(err));
});

module.exports=booksRouter;