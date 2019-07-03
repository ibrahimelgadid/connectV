var validator = require('validator');
var isEmpty = require('./is-empty')

 const validateRegisterInput= data=>{
    let errors = {};

    data.name= !isEmpty(data.name) ? data.name : '';
    data.email= !isEmpty(data.email) ? data.email : '';
    data.password= !isEmpty(data.password) ? data.password : '';
    data.password2= !isEmpty(data.password2) ? data.password2 : '';


    if(!validator.isLength(data.name,{max:20,min:4})){
        errors.name= 'Name must be between 4 and 20 characters'
    }
    

    if(validator.isEmpty(data.name)){
        errors.name= 'Name mustn\'t be empty'
    }


    if(validator.isEmpty(data.password)){
        errors.password= 'Password mustn\'t be empty'
    }


    if(validator.isEmpty(data.email)){
        errors.email= 'Email mustn\'t be empty'
    }


    if(validator.isEmpty(data.password2)){
        errors.password2= 'Confirm password field is required'
    }


    if(!validator.isEmail(data.email)){
        errors.email= 'Invalid email'
    }


    if(!validator.equals(data.password, data.password2)){
        errors.password2= 'password not match'
    }

    


    if(!validator.isLength(data.password,{min:6})){
            errors.password= 'Password must be at least 6 characters'
        }


    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateRegisterInput;