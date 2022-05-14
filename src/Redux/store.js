import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware,  } from 'redux';
import { save, load } from "redux-localstorage-simple";
import reducer from './reducers';

const configureStoreWithMiddleware = applyMiddleware(
	save({ states: [ 'credenciales', 'datosComunidad', 'datosMiembro' ] })
)(configureStore);

const store = configureStoreWithMiddleware(
    reducer,
    load({ states: [ 'credenciales', 'datosComunidad', 'datosMiembro' ] }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
        trace: true,
    })
);

export default store;