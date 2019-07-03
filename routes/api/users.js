require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../../model/user');
const jwt = require('jsonwebtoken');
const  bcrypt = require('bcryptjs');
const passport = require('passport');
const gravatar = require('gravatar');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');




/* ========================================= */
   /* =/=/=/=/=/=> POST REGISTER<=/=/=/=/= */
/* ========================================= */
router.post('/register',(req,res)=>{
    const{errors, isValid } = validateRegisterInput(req.body);
    
    if(!isValid){
       return res.status(400).json(errors);
    }

    User.findOne({email:req.body.email}).then(
        user=>{
            if(user){
                res.status(400).json({email:'This email is already exist'})
            }else{
                const avatar=gravatar.url(req.body.email,{
                    size:'200', rating:'pg', default:'mm'
                })
    
                let newUser =new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar:avatar,
                    password:req.body.password
                })
                
                
    
                bcrypt.genSalt(10, (err,salt)=>{
                    if(err) console.log(err);
                    bcrypt.hash(newUser.password,salt,(err, hash)=>{
                        if(err) console.log(err);
                        newUser.password = hash;
                        newUser.save().then(
                            user=>res.json(user)
                        ).catch(
                            err=>console.log(err)
                        )
                    })
                })
            }
            
        }
    )
})


/* ========================================= */
    /* =/=/=/=/=/=> POST LOGIN <=/=/=/=/= */
/* ========================================= */
router.post('/login',(req,res)=>{
    const{errors, isValid } = validateLoginInput(req.body);
    
    if(!isValid){
       return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(
        user=> {
                if(!user){
                    errors.email ='This email isn\'t exist';
                    res.status(404).json(errors)
            } else{
                // console.log(user)
                bcrypt.compare(password,user.password).then(
                    isMatch=>{
                        if(isMatch){
                            const payload = {
                                id:user._id,
                                name:user.name,
                                avatar:user.avatar,
                            }
                            const token = jwt.sign(
                                payload,process.env.secretOrKey,
                                {expiresIn:60*60*24}
                            )
                            res.status(200).json({
                                msg:'Auth successfull',
                                token:"Bearer " +token
                            })
                        } else{
                            errors.password = 'Wrong password'
                            res.status(400).json(errors)
                        }
                        
                    }
                )
            }

        }
    )
})


/* ========================================= */
 /* =/=/=/=/=/=> GET CURRENT USER<=/=/=/=/= */
/* ========================================= */

router.get('/current', passport.authenticate('jwt', 
{session:false}),(req,res)=>{
    res.json({
        id:req.user._id,
        name:req.user.name,
        email:req.user.email,
    })
}
)


module.exports = router;