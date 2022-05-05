import { combineReducers } from 'redux';
import credenciales from './datosLogin.reducer';

const rootReducer = combineReducers({
    credenciales
});

export default rootReducer;