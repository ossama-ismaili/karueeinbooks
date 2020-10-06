var express = require('express');
var usersRouter = express.Router();
var bcrypt=require('bcrypt');
var moment=require('moment');
var User=require('../models/User');

var userId="";

usersRouter.route('/login')
.post((req, res, next)=>{
  if(!req.body.email){
    res.status(422).send({message:"Email not given"});
  }
  else if(!req.body.password){
    res.status(422).send({message:"Password not given"});
  }
  else{
    User.findOne({email:req.body.email})
    .then(user=>{
      bcrypt.compare(req.body.password, user.password,(err, result)=>{
        if(result){
          userId=user._id;
          console.log("User Login : "+userId);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({username:user.username, image:user.image});
        }
        else{
          res.statusCode = 422;
          res.setHeader('Content-Type', 'application/json');
          res.json({message:"Password or email incorrect"});
        }
      });
    },err=>{
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.json({message:"There is no account with this email"});
    })
    .catch(err=>{
      res.statusCode = 422;
      res.setHeader('Content-Type', 'application/json');
      res.json({message:"There is no account with this email"});
    });
  }
});

usersRouter.route('/register')
.post(async (req, res, next)=> {
  const fullname=req.body.fullname;
  const image=`/images/${req.files.image.name}`;
  const username=req.body.username;
  const email=req.body.email;
  const created_at=moment().format("YYYY-MM-DD hh-mm-ss");
  const admin=false;
  const cart=[]
  const password=await bcrypt.hash(req.body.password,12);

  let user = new User({
    fullname:fullname,
    image:image,
    username:username,
    email:email,
    password:password,
    created_at:created_at,
    admin:admin,
    cart:cart
  });
  user.save()
  .then(user => {
      console.log('User Created: ',user);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  },err=>next(err))
  .catch(err => next(err));

  //Upload user image
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
  // accessing the file
  const myFile = req.files.image;    //  mv() method places the file inside public directory
  myFile.mv(`${__dirname}/public/images/${myFile.name}`, (err)=>{
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
});

usersRouter.route('/cart')
.get((req, res, next)=>{
    User.findById(userId)
    .then(user=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user.cart);
    },err=>next(err))
    .catch(err=>next(err));
})
.post((req, res, next)=>{
  User.findById(userId)
  .then(user=> {
      user.cart.push({quantity:req.body.quantity,book:req.body.book});
      user.save()
        .then((user) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.cart);
        }, (err) => next(err));
  },err=>next(err))
  .catch(err => next(err));
});

usersRouter.route('/cart/:id')
.put((req, res, next)=>{
    User.findById(userId)
    .then(user => {
        console.log("Update item : "+req.params.id);
        user.cart.id(req.params.id).quantity=req.body.quantity;
        user.save()
        .then((user) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.cart);
        }, (err) => next(err));
    },err=>next(err))
    .catch(err => next(err));
})
.delete((req, res, next)=>{
    User.findById(userId)
    .then(user => {
        console.log("Delete item : "+req.params.id);
        user.cart.id(req.params.id).remove();
        user.save()
        .then((user) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.cart);
        }, (err) => next(err));
    },err=>next(err))
    .catch(err => next(err));
});



module.exports = usersRouter;
