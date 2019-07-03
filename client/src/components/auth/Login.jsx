import React , {Component} from 'react';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import TextFieldGroupInput from '../common/TextFieldGroupInput';




class Login extends Component {
    state = { 
        email:'',
        password:'',
        errors:{}
     }

     onChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmit= (e)=>{
        e.preventDefault();
        const loginUser = {
            email:this.state.email,
            password:this.state.password,
        }
        this.props.loginUser(loginUser)
        
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps = (nextProps) => {
      if(nextProps.auth.isAuthenticated){
          this.props.history.push('/dashboard')
      }
    }
    
    render() { 
        const { errors } = this.props;
        const{ email,password} = this.state;
        return ( 
            <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form onSubmit={this.onSubmit.bind(this)}>

                        <TextFieldGroupInput 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            value={email}
                            onChange={this.onChange}
                            error={errors.email}
                        />
                        
                        
                        <TextFieldGroupInput 
                            type="password"
                            placeholder="password" 
                            name="password" 
                            value={password}
                            onChange={this.onChange}
                            error={errors.password}
                        />
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


Login.propTypes = {
    auth:PropTypes.object.isRequired,
    loginUser:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth:state.auth,
    errors:state.errors.errors
})
 
export default connect(mapStateToProps,{loginUser})(withRouter(Login));

