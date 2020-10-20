import {
    DOCTOR_API_CALL
} from '../actions';

const initialState = {
    apiResponse: {} 
}

export const doctorApiCallReducer = (state = initialState, action) => {
console.log(action)
    switch(action.type) {
        case DOCTOR_API_CALL: {
            state = {
                ...state,
                apiResponse: {...action.payload.response}
            }
            break;
        }
        default: {
            console.log('error: action type not match in doctorApiCallReducer')
        }
    }

    return state;

}