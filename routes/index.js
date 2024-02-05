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
router.get('/dash',async function(req,res){
  const posts=await postModel.find().populate("user");//populating so that uski id ki jagah real value aaye
  res.render('dashboard',{posts});
})
router.get('/video',function(req,res){
  res.render('video');
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

  router.post("/upload",upload.fields([{ name: 'image' }, { name: 'video' }]),async function(req,res){
    const user=await userModel.findOne({username: req.session.passport.user });
    const post=await postModel.create({
      picture : req.files['image'][0].filename,
      videoUrl : req.files['video'][0].filename,
      user: user._id,
      caption: req.body.caption
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect("/dash");
  });
  
module.exports = router;

