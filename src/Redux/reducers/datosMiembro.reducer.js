import { DATOS_MIEMBRO, MIEMBROS_COMUNIDAD } from '../actions';

const initialState = {
    miembro: {},
    miembros: []
};

const datosMiembroReducer = (state = initialState, action) => {
    switch (action.type) {

        case DATOS_MIEMBRO:
            return { ...state, miembro: action.payload };

        case MIEMBROS_COMUNIDAD:
            return {...state, miembros: action.payload};
            
        default:
            return state;
    }
}

export default datosMiembroReducer;