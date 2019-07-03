var validator = require('validator');
var isEmpty = require('./is-empty')

 const validateLoginInput= data=>{
    let errors = {};


    data.email= !isEmpty(data.email) ? data.email : '';
    data.password= !isEmpty(data.password) ? data.password : '';
 
    if(validator.isEmpty(data.password)){
        errors.password= 'Password mustn\'t be empty'
    }

    if(validator.isEmpty(data.email)){
        errors.email= 'Email mustn\'t be empty'
    }

    if(!validator.isEmail(data.email)){
        errors.email= 'Invalid email'
    }


    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateLoginInput;