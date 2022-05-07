import { DATOS_COMUNIDAD , MODIFICAR_COMUNIDAD } from '../actions';

const initialState = {
    id: ''
};

const datosComunidadReducer = (state = initialState, action) => {
    switch (action.type) {
        //GUARDO EN EL ESTADO LOS DATOS DE LA COMUNIDAD
        case DATOS_COMUNIDAD:
            return { ...state, id: action.payload };

        case MODIFICAR_COMUNIDAD:
            return { ...state, id: action.payload };

        default:
            return state
    }
}

export default datosComunidadReducer;