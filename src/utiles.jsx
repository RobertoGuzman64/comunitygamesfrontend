export const baseURL = 'https://comunitygamesbackend.herokuapp.com' || 'http://localhost:5000/';

export const checkError = (type,value) => {
    switch(type) {
        case 'email' :
            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ) {
                
                return "Introduce un e-mail válido";
            }else{
                return "ok";
            };
        case 'nombre': 
            if (! /[a-z]/gi.test(value) ) {
                return "Introduce un nombre válido";
            }else{
                return "ok";
            };
        default:
            return "ok";
        
    }
};