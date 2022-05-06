import { combineReducers } from 'redux';
import credenciales from './datosLogin.reducer';
import datosPerfil from './datosPerfil.reducer';

const rootReducer = combineReducers({
    credenciales,
    datosPerfil,
});

export default rootReducer;