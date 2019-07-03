var validator = require('validator');
var isEmpty = require('./is-empty')

 const validateExperinceInput= data=>{
    let errors = {};


    data.title= !isEmpty(data.title) ? data.title : '';
    data.company= !isEmpty(data.company) ? data.company : '';
    data.from= !isEmpty(data.from) ? data.from : '';
 
    if(validator.isEmpty(data.title)){
        errors.title= 'Job title mustn\'t be empty'
    }

    if(validator.isEmpty(data.company)){
        errors.company= 'Company mustn\'t be empty'
    }

    if(validator.isEmpty(data.from)){
        errors.from= 'From mustn\'t be empty'
    }


    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateExperinceInput;