import React , {Component} from 'react';
import { connect } from "react-redux";
import { addUser } from "../../actions/authActions";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import TextFieldGroupInput from '../common/TextFieldGroupInput';


class Register extends Component {
    state = { 
        name:'',
        email:'',
        password:'',
        password2:'',
        errors:{}
     }

     onChange = (e)=>{
         this.setState({
             [e.target.name]:e.target.value
         })
     }

     onSubmit= (e)=>{
        e.preventDefault();
        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2,
            }

            this.props.addUser(newUser,this.props.history);
            
            
        }

        componentDidMount() {
            if(this.props.auth.isAuthenticated){
                this.props.history.push('/dashboard')
            }
        }

        componentWillReceiveProps = (nextProps) => {
          if(nextProps.errors){
              this.setState({
                  errors:nextProps.errors
              })
          }
        }
        

    render() {
        const{errors, name,email,password,password2} = this.state;


        return ( 
            <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form onSubmit={this.onSubmit.bind(this)} >
                                                   
                            <TextFieldGroupInput 
                                placeholder="Name" 
                                name="name" 
                                value={name}
                                onChange={this.onChange}
                                error={errors.name}
                            />
                                
                         
                            <TextFieldGroupInput 
                                type="email" 
                                placeholder="Email" 
                                name="email" 
                                value={email}
                                onChange={this.onChange}
                                error={errors.email}

                                info='This site uses Gravatar so if you want a profile image ,use gravatar email'
                            />
                            
                            
                            <TextFieldGroupInput 
                                type="password"
                                placeholder="password" 
                                name="password" 
                                value={password}
                                onChange={this.onChange}
                                error={errors.password}
                            />


                            <TextFieldGroupInput 
                                type="password" 
                                placeholder="confirm password" 
                                name="password2" 
                                value={password2}
                                onChange={this.onChange}
                                error={errors.password2}
                            />                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
         );
    }
}

Register.propTypes = {
    auth:PropTypes.object.isRequired,
    addUser:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth:state.auth,
    errors:state.errors.errors
})
 
export default connect(mapStateToProps,{addUser})(withRouter(Register));

