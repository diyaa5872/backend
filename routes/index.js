var express = require('express');
var router = express.Router();
const userModel=require("./users");
const postModel=require("./post");
const commentModel=require("./comment");
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
// router.get('/video',async function(req,res){
//   // res.render('video');
//   const posts=await postModel.find();
//   res.render('video',{posts});
// })

router.get('/video/:videoId', async function(req, res) {
  const videoId = req.params.videoId;
  // Assuming you want to find the specific video details using the videoId
  const details = await postModel.findById(videoId);
  // You can then render your video details page with the specific video details
  res.render('video', { details });
});

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

  
  router.post("/video/:videoId/comments", async function (req, res) {
      const videoId = req.params.videoId;
      const details = await postModel.findById(videoId).populate("comments");
      console.log(req.params.videoId);
      console.log(req.body.comment);
  
      const newcomment = await commentModel.create({
        user: 'details.user.username',
        comment: req.body.comment
      });
  
      await newcomment.save();
      details.comments.push(newcomment);
  
      await details.save();
      res.redirect(`/video/${videoId}`);
  });
  

//  router.post("/video/:videoId/comment",async function(req,res){
//   const user = await userModel.findOne({ username: req.session.passport.user });
//   const videoId = req.params.videoId;

//   const comment = await postModel.create(videoId, {
//       comments: {
//         user: user._id,
//         text: req.body.comment,
//         date: new Date(),
//     },
//   });

//   user.comments.push(comment.comments[post.comments.length - 1]._id);
//   await user.save();
//   //  Now, retrieve the post with populated comments
//   const updatedPost = await postModel.findById(videoId).populate('comments.user');
//   // console.log(updatedPost);
//   // Render the video.ejs template with the updated post data
//   res.render('video', {updatedPost});
//   });

//   router.post('/posts/:postId/commented', async (req, res) => {
//     const postId = req.params.postId;

//         const post = await postModel.findById(postId);

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }
//         const commented=await postModel.create({
//           user: user._id,
//           comment: req.body.text,
//           date: new Date()
//         })
//         post.posts.push(comment._id);
//         await post.save();
//         res.redirect("/video");

// });
  
module.exports = router;

