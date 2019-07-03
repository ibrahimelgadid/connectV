const express = require('express');
const router = express.Router();
const Post = require('../../model/post');
const Profile = require('../../model/Profile');
const passport = require('passport');
const validatePostsInput = require('../../validation/posts');
const validateCommentsInput = require('../../validation/Comment');


/* ========================================= */
    /* =/=/=/=/=/=> Post Post  <=/=/=/=/= */
/* ========================================= */

router.post('/',passport.
authenticate('jwt',{session:false}),(req,res)=>{

    const {isValid, errors } = validatePostsInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    let newPost = {
        user:req.user._id
    };

    if(req.body.text) newPost.text = req.body.text;
    if(req.body.name) newPost.name = req.body.name;
    if(req.body.avatar) newPost.avatar = req.body.avatar;

     new Post(newPost).save().then(
        post =>res.json(post)
    )
    
})


/* === Public ============================== */
/* =/=/=/=/=/=/=/=> Get Post  <=/=/=/=/=/=/= */
/* ========================================= */

router.get('/', (req,res)=>{
    Post.find({}).sort({date:-1}).then(post=>
        res.json(post)
    ).catch(err=>res.json({post:'there is no posts'}))
})


/* === Public ============================= */
/* =/=/=/=/=/=>  Get Post By Id  <=/=/=/=/= */
/* ======================================== */

router.get('/:id', (req,res)=>{
    Post.findById({_id:req.params.id}).then(post=>
        res.json(post)
    ).catch(err=>
        res.json({post:'there is no post'}))
})


/* === Private ============================= */
/* =/=/=/=/=/=>  Delete Post By  <=/=/=/=/== */
/* ========================================= */

router.delete('/:id',passport.
authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user:req.user.id}).then(profile=>
        Post.findById({_id:req.params.id}).then(
            post=>{
               
                if(post.user.toString() != req.user._id){
                    return res.status(401).json(
                        {nonauthorized:'you are not authorized'}
                    )                  
                }else{
                    return post.remove().then(()=>
                        res.json({success:'true'})
                    )
                }
            } 
        )
    ).catch(
        err=>res.json({post:'there is no post'})
    )
})


/* === Private ============================= */
/* =/=/=/=/=/=/=>  Post Like   <=/=/=/=/=/== */
/* ========================================= */

router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user._id }).then(profile => {
        Post.findById(req.params.id)
          .then(post => {

            if (
                post.dislikes.filter(dislike => dislike.user.toString() == req.user._id)
                  .length > 0
 
              ) {
                 const removeIndex = post.dislikes.map(dislike=>dislike.user.toString()).
                 indexOf(req.user._id);
 
                 post.dislikes.splice(removeIndex,1)
                 
              } 


            if (
              post.likes.filter(like => like.user.toString() == req.user._id)
                .length > 0
            ) {
               // Add user id to likes array
                post.likes.shift({ user: req.user._id });
    
                post.save().then(post => res.json(post));
            }else{
                // Add user id to likes array
                post.likes.unshift({ user: req.user._id });
    
                post.save().then(post => res.json(post));
            }
  
            
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
      });
    }
  );


/* === Private ============================= */
/* =/=/=/=/=/=/=>  Post disLike <=/=/=/=/=/== */
/* ========================================= */

 router.post(
     '/dislike/:id',
     passport.authenticate('jwt', { session: false }),
     (req, res) => {
       Profile.findOne({ user: req.user._id }).then(profile => {
         Post.findById(req.params.id)
           .then(post => {
             if (
               post.likes.filter(like => like.user.toString() == req.user._id)
                 .length > 0

             ) {
                const removeIndex = post.likes.map(like=>like.user.toString()).
                indexOf(req.user._id);

                post.likes.splice(removeIndex,1)
                
             } 

             if (
                post.dislikes.filter(dislike => dislike.user.toString() == req.user._id)
                  .length > 0
              ) {
                 // Add user id to dislikes array
                  post.dislikes.shift({ user: req.user._id });
      
                  post.save().then(post => res.json(post));
              }else{
                  // Add user id to dislikes array
                  post.dislikes.unshift({ user: req.user._id });
      
                  post.save().then(post => res.json(post));
              }


           })
           .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
       });
     }
   );



/* === Private ============================= */
/* =/=/=/=/=/=/=>  Post comment <=/=/=/=/=/= */
/* ========================================= */

router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        
        const {isValid, errors } = validateCommentsInput(req.body);

        if(!isValid){
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
          .then(post => {
            newComment = {
                text:req.body.text,
                name:req.body.name,
                avatar:req.body.avatar,
                user:req.user._id,
            }

            post.comments.unshift(newComment);
            post.save().then(post => res.json(post));

          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    }
  );


  
/* === Private ============================= */
/* =/=/=/=/=/=>  Delete comment <=/=/=/=/=/= */
/* ========================================= */

router.delete('/comment/:id/:comment_id',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    Post.findById(req.params.id).then(post=>{
        if(post.comments.filter(comment=>comment._id == req.params.comment_id).length ===0){
            return res.status(400).json({commentnotexixt:'comment doesn\'t exist'})
        }else{
            const removeIndex = post.comments.map(comment=>comment._id.toString()).
            indexOf(req.params.comment_id);

            post.comments.splice(removeIndex,1);
            post.save().then(post => res.json(post));
        }
    })
})


module.exports = router;