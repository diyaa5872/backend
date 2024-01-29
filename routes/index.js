var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./post");
const passport=require("passport");
const localStrategy=require("passport-local");
const upload=require('./multer');


passport.use(new localStrategy(userModel.authenticate()));            
/* GET home page. */
router.get('/', function(req, res, next){        
  res.render('register');
});
router.get('/register',function(req,res){
  res.render('register');
})
router.get('/dash',function(req,res){
  res.render('dashboard');
})
router.get('/upload',async function(req,res){
  res.render('upload');
})
router.get('/index',async function(req,res){
  const user=await userModel.findOne({username: req.session.passport.user});
  res.render('index',{user});
})
router.get('/login',function(req,res){
  res.render('login');
})

router.post('/register',function(req,res,next){
  const userData=new userModel({
    username:req.body.username,
    name:req.body.name,
    email:req.body.email
  })
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/index");
    })
  })
});

router.post('/login',passport.authenticate("local",{
  successRedirect:"/index",
  failureRedirect:"/login"
}),function(req,res){
})

router.get("/logout",function(req,res,next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  
module.exports = router;

