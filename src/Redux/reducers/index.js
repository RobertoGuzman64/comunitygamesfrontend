import { combineReducers } from 'redux';
import credenciales from './datosLogin.reducer';
import datosComunidad from './datosComunidad.reducer';

const rootReducer = combineReducers({
    credenciales,
    datosComunidad,
});

export default rootReducer;