import * as type from "./type";
import axios from 'axios';


export const  getCurrentProfile = () =>dispatch =>{
    dispatch(setProfileLoading());
    axios.get('/api/profile').then(res=>
        dispatch({
            type:type.GET_PROFILE,
            payload:res.data
        })).catch(err=>
            dispatch({
                type:type.GET_PROFILE,
                payload:{}
            }))
}




export const setProfileLoading = () =>{
    return{
        type:type.PROFILE_LOADING
    }
}




export const clearCurrentProfile = () =>{
    return{
        type:type.CLEAR_CURRENT_PROFILE
    }
}


export const createProfile = (profileData, history)=>dispatch=>{
    axios.post('/api/profile', profileData)
    .then(res=>history.push('/dashboard'))
    .catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })}
    )
}



// Delete account & profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      axios
        .delete('/api/profile')
        .then(res =>
          dispatch({
            type: type.SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: type.GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  };

  export const addExperience = (experinceData,history)=>dispatch=>{
        axios.post('/api/profile/experience',experinceData).then(
            res=>history.push('/dashboard')
            
        ).catch(err=>{
            dispatch({
                type:type.GET_ERRORS,
                payload:err.response.data
            })}
        )
  }


  export const addEducation  = (educationData,history)=>dispatch=>{
    axios.post('/api/profile/education',educationData).then(
        res=>history.push('/dashboard')
        
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })}
    )
}


export const deleteExperience  = (id)=>dispatch=>{
    axios.delete('/api/profile/experience/'+id).then(
        res=>dispatch({
            type:type.GET_PROFILE,
            payload:res.data
        })
        
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })}
    )
}


export const deleteEducation = (id)=>dispatch=>{
    axios.delete('/api/profile/education/'+id).then(
        res=>dispatch({
            type:type.GET_PROFILE,
            payload:res.data
        })
        
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })}
    )
}

export const getProfiles = () => dispatch => {
    axios.get('/api/profile/all').then(res=>
        dispatch({
            type:type.GET_PROFILES,
            payload:res.data
        })
    ).catch(err=>
        dispatch({
            type:type.GET_PROFILES,
            payload:null
        })
    )
}

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
    dispatch(setProfileLoading());
    axios
      .get(`/api/profile/handle/${handle}`)
      .then(res =>
        dispatch({
          type:type.GET_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type:type.GET_PROFILE,
          payload: null
        })
      );
  };

