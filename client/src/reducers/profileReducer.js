import * as type from '../actions/type';

const initialState={
    profile:null,
    profiles:null,
    loading:false
};

export default function(state=initialState, action){
    switch (action.type) {

        case type.PROFILE_LOADING:
            return{
                ...state,
                loading:true
            }



        case type.CLEAR_CURRENT_PROFILE:
            return{
                ...state,
                profile:null
            }

        case type.GET_PROFILE:
            return{
                ...state,
                profile:action.payload,
                loading:false,
            }

        case type.GET_PROFILES:
            return{
                ...state,
                profiles:action.payload,
                loading:false,
            }
    
        default:
            return state;
    }
}