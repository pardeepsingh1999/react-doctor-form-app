import config from '../config/config';
import { makeGetRequest, makePostRequest } from './http-service';
const BASE_URL = config.BASE_URL;

export const getDoctorList = (bodyPaginateData) => {
    return new Promise((resolve, reject) => {
        makePostRequest(
            `${BASE_URL}/admin/v1/doctors`,
            true,
            bodyPaginateData
        )
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            console.log('api call error: ', err)
            reject(err);
        })
    })
};

export const getSpecialtyList = () => {
    return new Promise((resolve, reject) => {
        makeGetRequest(
            `${BASE_URL}/admin/v1/specialties`,
            true
        )
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            console.log('api call error: ', err)
            reject(err);
        })
    })
};