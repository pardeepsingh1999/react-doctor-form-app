import {
    DOCTOR_API_CALL
} from '../actions';

const initialState = {
    apiResponse: {} 
}

export const doctorApiCallReducer = (state = initialState, action) => {

    switch(action.type) {
        case DOCTOR_API_CALL: {
            state = {
                ...state,
                apiResponse: {...action.payload.response}
            }
            break;
        }
        default: {}
    }

    return state;

}