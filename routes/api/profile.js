const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')


const Profile = require('../../model/Profile');
const User = require('../../model/user');



/* ========================================= */
   /* =/=/=/=/=/=>  Get Profile <=/=/=/=/= */
/* ========================================= */

router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors = {};
    Profile.findOne({user:req.user._id}).populate('user', 'name').then(
        profile => {
            if(!profile){
                errors.profile = 'No profile for this user';
                res.status(404).json(errors)
            }else{
                res.json(profile)
            }
            
        }
    ).catch(
        err=>res.status(400).json({profile:'there is no profile for this user'})

    )
})


/* ========================================= */
/* =/=/=/=/=> Get Profile By Handle <=/=/=/= */
/* ========================================= */

router.get('/handle/:handle',(req,res)=>{
    let errors = {};
    Profile.findOne({handle:req.params.handle}).populate('user', ['name','avatar']).then(
        profile => {
            if(!profile){
                errors.profile = 'No profile for this handle';
                res.status(404).json(errors)
            }
            res.json(profile)
        }
    ).catch(err=>res.status(400).json({profile:'there is no profile for this user'})

    )
})

/* ========================================= */
  /* =/=/=/=/=> Get Profile By Id <=/=/=/= */
/* ========================================= */

router.get('/user/:user_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    let errors = {};
    Profile.findOne({user:req.params.user_id}).populate('user', ['name','avatar']).then(
        profile => {
            if(!profile){
                errors.profile = 'No profile for this handle';
                res.status(404).json(errors)
            }
            res.json(profile)
        }
    ).catch(
        err=>res.status(400).json({profile:'there is no profile for this user'})
    )
})


/* ========================================= */
 /* =/=/=/=/=/=>  Get All Profile <=/=/=/=/= */
/* ========================================= */

router.get('/all',(req,res)=>{
    let errors = {};
    Profile.find({}).populate('user',['name','avatar']).then(
        profiles => {
            if(!profiles){
                errors.profiles = 'No any  profile to view';
                res.status(404).json(errors)
            }
            res.json(profiles)
        }
    ).catch(
        err=>res.status(400).json({profile:'there is no profile for this user'})

    )
})



/* ========================================= */
  /* =/=/=/=/=/=>  Post Profile <=/=/=/=/= */
/* ========================================= */

router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const{ isValid, errors } = validateProfileInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
     }

    let profileFields = {
        user:req.user._id,
    }
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if(typeof req.body.skills !== 'undefined'){ 
            profileFields.skills = req.body.skills.split(',');
        }

    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({user:req.user._id}).then(
        profile=> {
            if(profile){
                Profile.findOneAndUpdate(
                    {user:req.user._id},
                    {$set:profileFields}, 
                    {new:true}).then(profile=> res.json(profile))
            }else{
                Profile.findOne({handle:profileFields.handle}).then(
                    profile=>{
                        if(profile){
                            errors.handle = 'that handle is already exist';
                            res.status(400).json(errors);
                        }else{
                            new Profile(profileFields).save().then(
                                profile =>res.json(profile)
                            );
                        }
                    } 
                )
            }
        }
    )
})


/*========================================*/
/*=/=/=/=>| Post Profile/experience |<=/=/=*/
/*========================================*/
 router.post('/experience',passport.authenticate('jwt',
{session:false}),(req,res,next)=>{

    const{ isValid, errors } = validateExperienceInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
     }
    Profile.findOne({user:req.user._id}).then(profile=>{
        const newExp={
            title:req.body.title,
            company:req.body.company,
            location:req.body.location,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description,
        }

        profile.experience.unshift(newExp);

        profile.save().then(
            profile=> res.json(profile)
        )
    })
     
 })


 /*========================================*/
/*=/=/=/=>| Post Profile/education |<=/=/=*/
/*========================================*/
router.post('/education',passport.authenticate('jwt',
{session:false}),(req,res,next)=>{

    const{ isValid, errors } = validateEducationInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
     }
    Profile.findOne({user:req.user._id}).then(profile=>{
        const newEdu={
            school:req.body.school,
            degree:req.body.degree,
            fieldofstudy:req.body.fieldofstudy,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            description:req.body.description,
        }

        profile.education.unshift(newEdu);

        profile.save().then(
            profile=> res.json(profile)
        )
    })
     
 })


/*========================================*/
/*=/=/=> Delete Profile/experience  <=/=/=*/
/*========================================*/

router.delete('/experience/:exp_id',
passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    Profile.findOne({user:req.user._id}).then(
        profile=>{
            const expToRemove =  profile.experience.map(exp=>exp._id)
            .indexOf(req.params.exp_id);

            profile.experience.splice(expToRemove,1);

            profile.save().then(
                profile=> res.json(profile)
            )
        }
    ).catch(
        err=>res.status(400).json(err)
    )
})



/*========================================*/
/*=/=/=> Delete Profile/education  <=/=/=*/
/*========================================*/

router.delete('/education/:edu_id',
passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    Profile.findOne({user:req.user._id}).then(
        profile=>{
            const eduToRemove =  profile.education.map(edu=>edu._id)
            .indexOf(req.params.edu_id);

            profile.education.splice(eduToRemove,1);

            profile.save().then(
                profile=> res.json(profile)
            )
        }
    ).catch(
        err=>res.status(400).json(err)
    )
})



/* ======================================== */
/* =/=/=/=/=/=> Delete Profile <=/=/=/=/=/= */
/* ======================================== */

router.delete('/',passport.authenticate('jwt',{session:false}),
(req,res)=>{
    Profile.findOneAndRemove({user:req.user._id}).then(
       ()=>{
           User.findByIdAndRemove({_id:req.user._id}).then(
               ()=>res.json({success:true})
           )
       }
    )
})





module.exports = router;