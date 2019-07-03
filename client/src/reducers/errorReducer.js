import * as type from '../actions/type'

const initialState={
errors:{}
};

export default function(state=initialState, action){
    switch (action.type) {
        case type.GET_ERRORS:
            return{
                ...state,
                errors:action.payload
            }

        case type.CLEAR_ERRORS:
            return{
                ...state,
                errors:{}
            }
    
        default:
            return state;
    }
}