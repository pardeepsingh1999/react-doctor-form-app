import { TOGGLE_TAB } from './action-types'; 

export const toggleTab = tabNumber => {
    return {
        type: TOGGLE_TAB,
        payload: {
            tabNumber
        }
    }
}