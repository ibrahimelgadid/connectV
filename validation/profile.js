var validator = require('validator');
var isEmpty = require('./is-empty')

 const validateProfileInput= data=>{
    let errors = {};


    data.handle= !isEmpty(data.handle) ? data.handle : '';
    data.status= !isEmpty(data.status) ? data.status : '';
    data.skills= !isEmpty(data.skills) ? data.skills : '';

   

    if(!validator.isLength(data.handle,{max:20,min:3})){
        errors.handle= 'Handle must be between 3 and 20 characters'
    }

    if(validator.isEmpty(data.handle)){
        errors.handle= 'Handle mustn\'t be empty'
    }

    if(validator.isEmpty(data.status)){
        errors.status= 'Status mustn\'t be empty'
    }

    if(validator.isEmpty(data.skills)){
        errors.skills= 'Skills mustn\'t be empty'
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = 'Enter valid URL'
        }    
    }

   
    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube = 'Enter valid URL'
        }
    }

    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = 'Enter valid URL'
        }
    }

    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'Enter valid URL'
        }
    
    }


    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = 'Enter valid URL'
        }
    
    }



    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateProfileInput;