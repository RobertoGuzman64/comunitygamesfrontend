import { DATOS_COMUNIDAD , MODIFICAR_COMUNIDAD } from '../actions';

const initialState = {
    comunidad: [],
};

const datosComunidadReducer = (state = initialState, action) => {
    switch (action.type) {
        //GUARDO EN EL ESTADO LOS DATOS DE LA COMUNIDAD
        case DATOS_COMUNIDAD:
            return { ...state, comunidad: action.payload };

        case MODIFICAR_COMUNIDAD:
            return { ...state, comunidad: action.payload };

        default:
            return state
    }
}

export default datosComunidadReducer;