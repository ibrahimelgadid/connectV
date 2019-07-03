import * as type from '../actions/type';
import axios from "axios";


export const addPost = postData =>dispatch=>{
    dispatch(clearErrors());
    axios.post('/api/posts',postData).then(
        res=>dispatch({
            type:type.ADD_POST,
            payload:res.data
        })
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}


export const setPostLoading = () =>{
    return{
        type:type.POST_LOADING
    }
}


export const getPosts = ()=>dispatch=>{
    dispatch(setPostLoading())
    axios.get('/api/posts').then(res=>{
        dispatch({
            type:type.GET_POSTS,
            payload:res.data
        })
    }).catch(err=>{
        dispatch({
            type:type.GET_POSTS,
            payload:[]
        })
    })
}



export const deletePost = (id) =>dispatch=>{
    axios.delete('/api/posts/'+id).then(
        res => {
            dispatch({
                type:type.DELETE_POST,
                payload:id
            })
        }
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}


export const addLike = (id) =>dispatch=>{
    axios.post('/api/posts/like/'+id).then(
        res =>dispatch(getPosts())).catch(err=>{
            dispatch({
                type:type.GET_ERRORS,
                payload:err.response.data
        })
    })
}


export const addDislike = (id) =>dispatch=>{
    axios.post('/api/posts/dislike/'+id).then(
        res =>dispatch({
            type:type.ADD_DISLIKE,
            payload:res.data
    })).catch(err=>{
            dispatch({
                type:type.GET_ERRORS,
                payload:err.response.data
        })
    })
}


export const getPost = (id)=>dispatch=>{
    dispatch(setPostLoading())
    axios.get('/api/posts/'+id).then(res=>{
        dispatch({
            type:type.GET_POST,
            payload:res.data
        })
    }).catch(err=>{
        dispatch({
            type:type.GET_POST,
            payload:null
        })
    })
}


export const addComment = (id,commentData) =>dispatch=>{
    dispatch(clearErrors());
    axios.post('/api/posts/comment/'+id,commentData).then(
        res=>dispatch({
            type:type.GET_POST,
            payload:res.data
        })
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}


export const deleteComment = (postId,commentId) =>dispatch=>{
    axios.delete('/api/posts/comment/'+postId+'/'+commentId).then(
        res=>dispatch({
            type:type.GET_POST,
            payload:res.data
        })
    ).catch(err=>{
        dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        })
    })
}


export const clearErrors = () => dispatch=>{
    dispatch({
        type:type.CLEAR_ERRORS
    })
}