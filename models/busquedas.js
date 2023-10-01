const axios = require('axios');

class Busquedas {

    historial = ['Tegucigalpa','Madrid', 'San Jose'];

    constructor() {
        // TODO: Leer DB si existe


    }

    get paramsMaxbox() {
        return {
            'limit': 5,
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es'
        }
    }

    async ciudad( lugar = '') {

        try {
            // peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMaxbox
            })

            const resp = await instance.get();

            console.log(resp.data);

            return []; //retornar los lugares   

        } catch (error) {
            console.log(error);
            return [];
        }

        
    }

}

module.exports = Busquedas