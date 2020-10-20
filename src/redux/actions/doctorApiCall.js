import { DOCTOR_API_CALL } from './action-types'; 
import { getDoctorList } from '../../https/http-calls';

export const doctorApiCall = bodyPaginateData => {

    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            // Fetch will data from server and update
            try {
              const response = await getDoctorList(bodyPaginateData)
              if (response.error) {
                // now dispatch your action.
                console.log('doctorApiCall error: ', response)
                dispatch({
                    type: DOCTOR_API_CALL,
                    payload: {
                        response
                    }
                })
                resolve();
              } else {
                    response.doctors.forEach( e => {
                        if(e.availability && e.availability.length) {
                            let doctorTiming = {
                                monday: [],
                                tuesday: [],
                                wednesday: [],
                                thursday: [],
                                friday: [],
                                saturday: [],
                                sunday: []
                            }
                            e.availability.forEach(ee => {
                                doctorTiming[ee.day.toLowerCase()].push({from:ee.from,to:ee.to})
                            })
                            e.availability = doctorTiming;
                        }
                    })
                
                    dispatch({
                        type: DOCTOR_API_CALL,
                        payload: {
                            response
                        }
                    })
                    resolve();
              }
            } catch (error) {
                console.log("error :", error);
                reject(error);
            }
        });
  
    }
   
}
