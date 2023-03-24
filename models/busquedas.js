import fs from 'fs';
import axios from 'axios';

class Busquedas {

    historial = [];
    dbPath= './db/database.json';

    constructor() {
        //TO DO: leer DB si existe
        this.leerDB();
    }

    get historialCapitalizado() {
        //capitalizar cada palabra

        return this.historial.map(lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));
            
            return palabras.join(' ')
        })
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'lenguage' : 'es'
        }
    }

    async ciudad(lugar = '') {

        try {
            // petidion http
            // console.log('Ciudad', lugar);
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }))

            return [];

        } catch (error) {
            return [];
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async climaLugar(lat, lon) {

        try {
            // instance axios.create()
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            });
            //resp.data
            const resp = await intance.get();
            const { weather, main} = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial (lugar ='') {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        //TODO: prevenir duplicados
        this.historial.unshift(lugar.toLocaleLowerCase());
        //grabar en DB
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify(payload));
    }

    leerDB () {
        //debe de existir...
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }
        //const info... readfilesync ... path ... {encoding:utf-8}
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8'});
        const data = JSON.parse(info)

        this.historial = data.historial
        //this.historial= ...historial
    }
}

export {
    Busquedas
}