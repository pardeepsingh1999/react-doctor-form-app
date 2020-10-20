import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { addDoctorReducer, doctorApiCallReducer } from './reducers';

const rootReducers = combineReducers({
    addDoctor: addDoctorReducer,
    doctorApiCall: doctorApiCallReducer
});

const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: '',
    blacklist: ['doctorApiCall']
};

const pReducer = persistReducer(persistConfig, rootReducers)

const middleware = applyMiddleware(thunk);

export const store = createStore(
    pReducer,
    undefined,
    middleware
)

export const persistor = persistStore(store)