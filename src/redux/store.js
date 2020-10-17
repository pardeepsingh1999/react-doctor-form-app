import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { addDoctorReducer } from './reducers';

const rootReducers = combineReducers({
    addDoctor: addDoctorReducer
});

const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: '',
    whitelist: ['addDoctor']
};

const pReducer = persistReducer(persistConfig, rootReducers)

export const store = createStore(
    pReducer,
    undefined
)

export const persistor = persistStore(store)