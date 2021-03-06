var validator = require('validator');
var isEmpty = require('./is-empty')

 const validateEducationInput= data=>{
    let errors = {};


    data.school= !isEmpty(data.school) ? data.school : '';
    data.degree= !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy= !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from= !isEmpty(data.from) ? data.from : '';
 
    if(validator.isEmpty(data.school)){
        errors.school= 'School mustn\'t be empty'
    }

    if(validator.isEmpty(data.degree)){
        errors.degree= 'Degree mustn\'t be empty'
    }

    if(validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy= 'Field of study mustn\'t be empty'
    }

    if(validator.isEmpty(data.from)){
        errors.from= 'From mustn\'t be empty'
    }


    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateEducationInput;