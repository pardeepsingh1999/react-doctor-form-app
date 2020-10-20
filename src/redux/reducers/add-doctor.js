import {
    ADD_DOCTOR_DETAILS,
    ADD_DOCTOR_TIMING, 
    TOGGLE_TAB,
    ADD_DOCTOR_FORM_RESET
} from '../actions';

const initialState = {
    activeTab: '1',
    doctorDetails : {},
    doctorList: []
}

export const addDoctorReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_DOCTOR_DETAILS: {
            state = {
                ...state,
                doctorDetails: {...action.payload.doctorDetails},
                activeTab: '2'
            }
            break;
        }
        case ADD_DOCTOR_TIMING: {
            let obj = {
                ...state.doctorDetails
            }
            if(action.payload.doctorTiming && Object.keys(action.payload.doctorTiming).length) {
                Object.assign(obj, {availability: action.payload.doctorTiming})
            }
            state = {
                ...state,
                doctorDetails: {},
                doctorList: [...state.doctorList, obj],
                activeTab: '1'
            }
            break;
        }
        case ADD_DOCTOR_FORM_RESET: {
            state = {
                ...state,
                doctorDetails: {},
                activeTab: '1'
            }
            break;
        }
        case TOGGLE_TAB: {
            if(action.payload.tabNumber === '2') {
                if(state.doctorDetails && Object.keys(state.doctorDetails).length) {
                    state = {
                        ...state,
                        activeTab: action.payload.tabNumber
                    }
                } else {
                    state = {
                        ...state,
                        activeTab: '1'
                    }
                }
            } else {
                state = {
                    ...state,
                    activeTab: '1'
                }
            }

            break;
        }
        default: {}
    }

    return state;

}