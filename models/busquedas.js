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

            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            })); 

        } catch (error) {
            console.log(error);
            return [];
        }

        
    }

}

module.exports = Busquedas