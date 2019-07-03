import * as type from "./type";
import axios from 'axios'
import setAuthToken from "../utilis/setAuthToken";
import jwt_decode from "jwt-decode";


export const addUser = (userData,history) =>dispatch =>{
    axios.post('/api/users/register',userData).then(
        res=> history.push('/login')
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
            })
        }
    )
}





export const setCurrentUser = (decoded) =>{
    return{
        type:type.SET_CURRENT_USER,
        payload:decoded
    }
}





export const loginUser = (userData) => dispatch =>{
    axios.post('api/users/login', userData).then(res=>{       
        const {token} = res.data;
        localStorage.setItem('jwtToken',token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded))
        }   
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
            })
        }
    )
}






export const logoutUser = ()=> dispatch =>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}