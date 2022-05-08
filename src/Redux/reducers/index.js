import { combineReducers } from 'redux';
import credenciales from './datosLogin.reducer';
import datosComunidad from './datosComunidad.reducer';
import datosMiembro from './datosMiembro.reducer';

const rootReducer = combineReducers({
    credenciales,
    datosComunidad,
    datosMiembro,
});

export default rootReducer;