const fs = require('fs')
const axios = require('axios');


class Busquedas {

    historial = [];
    dbPath = './db/database.json';  

    constructor() {
        this.leerDB()

    }

    get historialCapitalizado() {
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        })
    }

    get paramsMaxbox() {
        return {
            'limit': 5,
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es'
        }
    }

    get paramsOpenWether() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric',
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
            //console.log(resp.data);
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

    async climaLugar( lat, lon ) {

        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: {... this.paramsOpenWether, lat, lon,
                }

            })

            const resp = await instance.get()
            const {weather, main} = resp.data
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async agregarHistorial( lugar ) {
        //TODO: PREVENIR DUPLICADOS

        if(this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        };

        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en db
        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify(payload))
    }

    leerDB(){

        const archivo = this.dbPath;

        if(!fs.existsSync(archivo)) {
            return;
        }

        const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        
        this.historial = data.historial

        //return data;
    }

}

module.exports = Busquedas