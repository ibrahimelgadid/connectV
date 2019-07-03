import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types'


const TextFieldGroupInput = ({
    label,name,error,value,placeholder,
    disabled,info,onChange,type
}) => {
    return ( 
        <div className="form-group">
            <input 
                type={type} 
                className={classnames('form-control form-control-lg',{
                    'is-invalid' :error
                })}
                placeholder={placeholder} 
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
     );
}

TextFieldGroupInput.propTypes = {
    info:PropTypes.string,
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    type:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    error:PropTypes.string,
    disabled:PropTypes.string
}

TextFieldGroupInput.defaultprops = {
    type:'text'
}
 
export default TextFieldGroupInput;