import { ADD_DOCTOR_DETAILS } from './action-types';

export const addDoctorDetails = doctorDetails => {
    return {
        type: ADD_DOCTOR_DETAILS,
        payload: {
            doctorDetails
        }
    }
}