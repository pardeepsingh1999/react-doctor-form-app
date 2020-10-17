import { ADD_DOCTOR_TIMING } from './action-types'; 

export const addDoctorTiming = doctorTiming => {
    return {
        type: ADD_DOCTOR_TIMING,
        payload: {
            doctorTiming
        }
    }
}