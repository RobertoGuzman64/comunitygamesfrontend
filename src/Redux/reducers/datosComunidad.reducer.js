import { DATOS_COMUNIDAD, GENERO_COMUNIDAD, ESTADO_INICIAL, MODIFICAR_COMUNIDAD} from '../actions';

const initialState = {
    comunidad: {},
    comunidades: []
};

const datosComunidadReducer = (state = initialState, action) => {
    switch (action.type) {
        //GUARDO EN EL ESTADO LOS DATOS DE LA COMUNIDAD
        case DATOS_COMUNIDAD:
            return { ...state, comunidad: action.payload };
        case GENERO_COMUNIDAD:
            return { ...state, comunidades: action.payload };
        case ESTADO_INICIAL:
            return initialState;
        case MODIFICAR_COMUNIDAD:
            return { ...state, comunidad: action.payload };
        default:
            return state
    }
}

export default datosComunidadReducer;