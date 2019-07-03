var validator = require('validator');
var isEmpty = require('./is-empty')

 const validatePostsInput= data=>{
    let errors = {};


    data.text= !isEmpty(data.text) ? data.text : '';
 
    if(validator.isEmpty(data.text)){
        errors.text= 'Text mustn\'t be empty'
    }

    


    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validatePostsInput;